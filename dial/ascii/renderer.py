import abc
import itertools

from ..lazyattr import LazyAttribute
from ..renderer import Renderer
from ..sequence import SequenceDiagram, Call, Condition, Loop, Note

from .canvas import ASCIICanvas


LEFT = 0
RIGHT = 1


def twiniter(l):
    if not hasattr(l, '__next__'):
        l = iter(l)

    f = None
    try:
        f = next(l)
        while True:
            n = next(l)
            yield f, n
            f = n
    except StopIteration:
        yield f, None


class ASCIIRenderer(Renderer):
    def __init__(self, diagram, canvas=None):
        self.diagram = diagram
        if canvas is None:
            self.canvas = ASCIICanvas()
        else:
            self.canvas = canvas

    def _extend(self, i):
        self.canvas.extendbottom(i)

    @property
    def row(self):
        return self.canvas.rows - 1

    def dumps(self):
        self._render_header()

        for unit in self.diagram:
            if isinstance(unit, SequenceDiagram):
                ASCIISequenceRenderer(unit, self.canvas).render()

        return str(self.canvas)

    def _render_header(self):
        dia = self.diagram
        self._extend(1)
        self.canvas.write_textline(1, self.row, f'DIAGRAM: {dia.title} ')

        if dia.author:
            self._extend(1)
            self.canvas.write_textline(1, self.row, f'author: {dia.author} ')

        if dia.version:
            self._extend(1)
            self.canvas.write_textline(1, self.row, f'version: {dia.version} ')

        self._extend(1)


class Plan:
    pass


class ModulePlan(Plan):
    col = 0
    row = 0
    lpad = 1
    rpad = 1

    def __init__(self, module):
        self.module = module

    def __repr__(self):
        return f'ModulePlan: {self.title}'

    @LazyAttribute
    def box_hpadding(self):
        return 1, int(not(len(self.title) % 2)) + 1

    @LazyAttribute
    def boxlen(self):
        lp, rp = self.box_hpadding
        return len(self.title) + lp + rp + 2

    @LazyAttribute
    def title(self):
        return self.module.title

    @property
    def middlecol(self):
        return self.col + self.boxlen // 2

    def drawbox(self, canvas, col=None, row=None):
        if col:
            self.col = col

        if row:
            self.row = row

        canvas.draw_textbox(self.col, self.row, self.title,
                            hpadding=(self.box_hpadding))

    def drawpipe(self, canvas, row):
        canvas.set_char(self.middlecol, row, '|')


class ItemPlan(Plan, metaclass=abc.ABCMeta):
    char = '!'
    repr_symbol = '!!!!'
    direction = RIGHT
    length = 0
    start = 0
    end = 0

    def __init__(self, item, direction, level):
        self.item = item
        self.level = level
        self.direction = direction

    def __repr__(self):
        return f'{self.repr_symbol} {repr(self.item)}'

    @LazyAttribute
    def textwidth(self):
        if self.text:
            return len(self.text)

        return 0

    @property
    def kind(self):
        return self.item.kind

    @property
    def text(self):
        return self.item.text

    @abc.abstractmethod
    def calc(self):
        raise NotImplementedError()


class ItemStartPlan(ItemPlan):
    char = '~'
    repr_symbol = '~~~>'
    reverse = False
    selfcall = False

    def __init__(self, item, caller, callee, direction, level):
        super().__init__(item, direction, level)
        self.caller = caller
        self.callee = callee
        if caller is callee:
            self.selfcall = True

    def _calc_selfcall(self):
        self.start = self.caller.middlecol

        l = 0
        if self.item.text:
            l = len(self.item.text)

        if self.item.returntext:
            l = max(len(self.item.returntext), l)

        self.length = l + 6
        self.start += 1
        self.end = self.start + self.length
        return 1

    def _calc_otherscall(self):
        self.start = self.caller.middlecol
        self.end = self.callee.middlecol

        if self.start > self.end:
            self.start, self.end = self.end, self.start

        self.start += 1
        self.length = self.end - self.start

        return 1

    def calc(self):
        if self.selfcall:
            return self._calc_selfcall()
        else:
            return self._calc_otherscall()

    def draw(self, canvas, row):
        canvas.draw_hline(self.start, row, self.length, char=self.char)
        if self.direction == LEFT:
            canvas.set_char(self.start, row, '<')
        else:
            canvas.set_char(self.end - 1, row, '>')

        if self.text:
            canvas.write_textline(self.start + 3, row, self.text)

        if not self.selfcall:
            return

        canvas.set_char(self.end, row, '+')
        canvas.set_char(self.end - 1, row, self.char)
        if canvas.cols - self.end == 1:
            canvas.extendright(1)


class ItemEndPlan(ItemStartPlan):
    char = '-'
    repr_symbol = '<---'
    reverse = True

    @property
    def text(self):
        return self.item.returntext

    def draw(self, canvas, row):
        super().draw(canvas, row)
        if self.selfcall:
            canvas.set_char(self.end, row - 1, '|')


class ConditionStartPlan(ItemPlan):
    char = '*'
    startmodule = None
    endmodule = None
    children = None

    def __init__(self, item, startmodule, endmodule, level):
        super().__init__(item, RIGHT, level)
        self.startmodule = startmodule
        self.endmodule = endmodule

    @LazyAttribute
    def text(self):
        result = f'{self.item.kind}'
        if self.item.text:
            result += f' {self.item.text}'

        return result

    def calc(self):
        if self.startmodule is None:
            self.start = 1
            self.length = max(10, self.textwidth + 4)
            self.end = self.length + 1
            return 3

        self.start = self.startmodule.col
        self.end = self.endmodule.col + self.endmodule.boxlen

        self.length = self.end - self.start

        return 3

    def draw(self, canvas, row):
        canvas.draw_hline(self.start, row, self.length, char=self.char)

        row += 1
        canvas.write_textline(self.start, row, ' ' * self.length)
        canvas.set_char(self.start, row, '*')
        canvas.set_char(self.end - 1, row, '*')
        canvas.write_textline(self.start + 2, row, self.text)

        row += 1
        canvas.draw_hline(self.start, row, self.length, char=self.char)


class ConditionEndPlan(ConditionStartPlan):

    @property
    def text(self):
        if self.kind in ('if', 'elif', 'else'):
            return 'end if'

        return f'end {self.kind}'


class NotePlan(ItemPlan):
    char = '-'
    repr_symbol = '@'
    startmodule = None
    endmodule = None

    def __init__(self, item, startmodule, endmodule, level):
        super().__init__(item, RIGHT, level)
        self.startmodule = startmodule
        self.endmodule = endmodule

    @LazyAttribute
    def lines(self):
        return self.text.splitlines()

    @LazyAttribute
    def textwidth(self):
        return max(len(x) for x in self.lines)

    def calc(self):
        self.start = self.startmodule.col

        if self.endmodule is None:
            self.length = self.startmodule.boxlen
        else:
            self.length = (self.endmodule.col + self.endmodule.boxlen) - \
                self.start

        self.length = max(self.length, self.textwidth + 4)
        self.end = self.start + self.length
        return len(self.lines) + 2

    def draw(self, canvas, row):
        canvas.draw_hline(self.start, row, self.length, char=self.char)

        for l in self.lines:
            row += 1
            canvas.write_textline(self.start, row, ' ' * self.length)
            canvas.write_textline(self.start + 2, row, l)
            canvas.set_char(self.start, row, '|')
            canvas.set_char(self.end - 1, row, '|')

        row += 1
        canvas.draw_hline(self.start, row, self.length, char=self.char)


class ASCIISequenceRenderer(ASCIIRenderer):
    _moduleplans = None
    _moduleplans_dict = None
    _itemplans = None

    def _planmodules(self):
        self._moduleplans = []
        self._moduleplans_dict = {}

        for m in self.diagram.modules_order:
            module = ModulePlan(self.diagram.modules[m])
            self._moduleplans.append(module)
            self._moduleplans_dict[m] = module

        for k, v in self.diagram.modules.items():
            if k not in self._moduleplans_dict:
                module = ModulePlan(self.diagram.modules[k])
                self._moduleplans.append(module)
                self._moduleplans_dict[k] = module

    def _fromto_modules(self, from_, to, reverse=False):
        capt = False

        it = self._moduleplans
        if reverse:
            it = reversed(it)

        for m, nm in twiniter(it):
            if not capt and m is not from_:
                continue

            if m is from_:
                capt = True

            if capt:
                if m is to:
                    yield m, None
                    return
                yield m, nm

    def _availspacefor_call(self, from_, to, reverse=False):
        result = 0
        for m, nm in self._fromto_modules(from_, to, reverse):
            result += m.boxlen
            if nm is None:
                continue

            if reverse:
                result += max(m.lpad, nm.rpad)
            else:
                result += max(m.rpad, nm.lpad)

        if from_:
            result -= from_.boxlen // 2 + 1

        if to:
            result -= to.boxlen // 2 + 1

        result -= 8
        return 0 if result < 0 else result

    def _availspacefor_condition(self, from_, to):
        result = 0
        for m, nm in self._fromto_modules(from_, to, False):
            if m is None:
                break

            result += m.boxlen
            if nm is None:
                continue

            result += max(m.rpad, nm.lpad)

        result -= 4
        if result < 0:
            return 0

        return result

    def _availspacefor_note(self, from_, to):
        result = 0
        if to is None:
            result += from_.boxlen
        else:
            for m, nm in self._fromto_modules(from_, to, False):
                result += m.boxlen
                if nm is None:
                    continue

                result += max(m.rpad, nm.lpad)

            # result -= to.boxlen

        result -= 4

        return result

    def _find_condition_startend(self, children):
        l = [
            (
                self._moduleplans.index(i.caller),
                self._moduleplans.index(i.callee)
            )
            for i in children
            if isinstance(i, ItemStartPlan)
        ]

        l = sorted(list(set(itertools.chain(*l))))
        s, e = l[0], l[-1]
        return self._moduleplans[s], self._moduleplans[e], s, e

    def _plancondition(self, item, level):
        start, end = None, None
        if self._itemplans:
            last = self._itemplans[-1]
            if isinstance(last, ConditionEndPlan):
                if item.kind not in ('if', 'for', 'while'):
                    old = self._itemplans.pop()
                    start = old.startmodule
                    end = old.endmodule

        condstart_plan = ConditionStartPlan(item, start, end, level)
        self._itemplans.append(condstart_plan)

        if len(item):
            self._recurse(item, level + 1)

        s = self._itemplans.index(condstart_plan) + 1
        if len(self._itemplans) > s:
            start, end, si, ei = \
                self._find_condition_startend(self._itemplans[s:])

            for p in self._itemplans[s::-1]:
                if p.level > level:
                    continue

                if p.startmodule is None:
                    p.startmodule = start
                else:
                    mi = self._moduleplans.index(p.startmodule)
                    if mi > si:
                        p.startmodule = start
                    elif mi < si:
                        start = p.startmodule

                if p.endmodule is None:
                    p.endmodule = end
                else:
                    mi = self._moduleplans.index(p.endmodule)
                    if mi < ei:
                        p.endmodule = end
                    elif mi > si:
                        end = p.endmodule

                if p.kind in ('if', 'for', 'while'):
                    break

        avail = self._availspacefor_condition(start, end)
        if condstart_plan.textwidth > avail:
            amount = condstart_plan.textwidth - avail
            if start:
                start.rpad += amount

            if end:
                end.lpad += amount

        condend_plan = ConditionEndPlan(item, start, end, level)
        self._itemplans.append(condend_plan)

        condstart_plan.children = self._itemplans

    def _plannote(self, item, level):
        modules = item.modules
        start = self._moduleplans_dict[modules[0]]
        if len(modules) > 1:
            end = self._moduleplans_dict[modules[1]]
        else:
            end = None

        noteplan = NotePlan(item, start, end, level)
        self._itemplans.append(noteplan)

        avail = self._availspacefor_note(start, end)
        if noteplan.textwidth > avail:
            amount = noteplan.textwidth - avail
            if start:
                start.rpad += amount

            if end:
                end.lpad += amount

    def _calculate_paddings(self, itemplan, callee, caller, dir_):
        if itemplan.selfcall:
            if itemplan.selfcall:
                callee.rpad = max(callee.rpad, itemplan.textwidth + 3)
        else:
            avail = self._availspacefor_call(caller, callee,
                                             reverse=dir_ == LEFT)
            if itemplan.textwidth > avail:
                amount = itemplan.textwidth - avail
                if dir_ == LEFT:
                    callee.rpad += amount
                else:
                    callee.lpad += amount

    def _plancall(self, item, level):
        caller = self._moduleplans_dict[item.caller]
        callee = self._moduleplans_dict[item.callee]
        diff = self._moduleplans.index(callee) - \
            self._moduleplans.index(caller)

        dir_ = LEFT if diff < 0 else RIGHT
        itemplan = ItemStartPlan(item, caller, callee, dir_, level)
        self._itemplans.append(itemplan)
        self._calculate_paddings(itemplan, callee, caller, dir_)

        if len(item):
            self._recurse(item, level + 1)

        itemplan = ItemEndPlan(item, caller, callee, not(dir_), level)
        self._itemplans.append(itemplan)

        if itemplan.text:
            self._calculate_paddings(itemplan, callee, caller, dir_)

    def _recurse(self, parent, level):
        for item in parent:
            if isinstance(item, Call):
                self._plancall(item, level)
            elif isinstance(item, (Condition, Loop)):
                self._plancondition(item, level)
            elif isinstance(item, Note):
                self._plannote(item, level)

    def _planitems(self):
        self._itemplans = []
        self._recurse(self.diagram, 0)

    def plan(self):
        self._planmodules()
        self._planitems()

    # Sequence
    def _render_modules(self):
        if not self._moduleplans:
            return

        self._extend(1)
        fm = self._moduleplans[0]
        row = self.row
        col = max(1, fm.lpad)

        for m, nm in twiniter(self._moduleplans):
            m.drawbox(self.canvas, col, row)
            col += m.boxlen + max(m.rpad, nm.lpad if nm else 1)

        if col > self.canvas.cols:
            self.canvas.extendright(col - self.canvas.cols)

        self._extend(1)

    def _render_emptyline(self):
        for m in self._moduleplans:
            m.drawpipe(self.canvas, self.row)

    def _render_items(self):
        lastdir = None
        lasttype = None

        for c in self._itemplans:
            self._render_emptyline()
            extrarows = c.calc() - 1

            if c.direction != lastdir or not lasttype or \
                    not isinstance(c, lasttype):
                self._extend(1)
                self._render_emptyline()

            lastdir = c.direction
            lasttype = type(c)
            for i in range(extrarows):
                self._extend(1)
                self._render_emptyline()

            c.draw(self.canvas, self.row - extrarows)
            self._extend(1)

    def render(self):
        self.plan()

        # Sequence Header
        if self.diagram.title:
            self._extend(1)
            self.canvas.write_textline(
                1, self.row, f'SEQUENCE: {self.diagram.title} ')
            self._extend(1)

        self._render_modules()
        self._render_emptyline()
        self._render_items()
        self._render_emptyline()
        self._render_modules()
