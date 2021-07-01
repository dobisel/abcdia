from .mutablestring import MutableString
from .renderer import Canvas, Renderer
from .sequence import SequenceDiagram


class ASCIICanvas(Canvas):

    def __init__(self, size=(0, 0)):
        self._backend = []
        self.cols = size[0]
        self.rows = 0
        self.extendbottom(size[1])

    @property
    def size(self):
        return self.cols, self.rows

    def extendright(self, addcols):
        for r in self._backend:
            r.extendright(addcols)

        self.cols += addcols

    def extendleft(self, addcols):
        for r in self._backend:
            r.extendleft(addcols)

        self.cols += addcols

    def extendbottom(self, addrows):
        for i in range(addrows):
            self._backend.append(MutableString(self.cols))

        self.rows += addrows

    def extendtop(self, addrows):
        for i in range(addrows):
            self._backend.insert(0, MutableString(self.cols))

        self.rows += addrows

    def __str__(self):
        return '\n'.join(str(l) for l in self._backend)

    def set_char(self, col, row, char):
        if self.cols <= col:
            self.extendright((col + 1) - self.cols)

        if self.rows <= row:
            self.extendbottom((row + 1) - self.rows)

        self._backend[row][col] = char

    def draw_vline(self, col, startrow, length):
        for r in range(startrow, startrow + length):
            self.set_char(col, r, '|')

    def write_hcenter(self, col, row, text, width=None):
        tlen = len(text)
        col = col + (width or self.cols) // 2 - tlen // 2
        self.write_textline(col, row, text)

    def draw_hline(self, col, row, length, text=None, texttop=None,
                   textbottom=None):
        for c in range(col, col + length):
            self.set_char(c, row, '-')

        if text:
            self.write_hcenter(col, row, text, length)

        if texttop:
            self.write_hcenter(col, row - 1, texttop, length)

        if textbottom:
            self.write_hcenter(col, row + 1, textbottom, length)

    def draw_box(self, col, row, width, height):
        lastrow = row + height - 1
        lastcol = col + width - 1
        hline_start = col + 1
        hline_end = width - 2
        vline_start = row + 1
        vline_end = height - 2

        self.draw_hline(hline_start, row, hline_end)
        self.draw_hline(hline_start, lastrow, hline_end)
        self.draw_vline(col, vline_start, vline_end)
        self.draw_vline(lastcol, vline_start, vline_end)
        self.set_char(col, row, '+')
        self.set_char(col + width - 1, row, '+')
        self.set_char(col, row + height - 1, '+')
        self.set_char(col + width - 1, row + height - 1, '+')

    def write_textline(self, col, row, line):
        for c in line:
            self.set_char(col, row, c)
            col += 1

    def write_textblock(self, col, row, text):
        for line in text.splitlines():
            self.write_textline(col, row, line)
            row += 1

    def draw_textbox(self, col, row, text, hmargin=0, vmargin=0):
        lines = text.splitlines()
        textheight = len(lines)
        width = max(len(l) for l in lines)

        boxheight = textheight + (vmargin * 2) + 2
        boxwidth = width + (hmargin * 2) + 2
        self.write_textblock(col + hmargin + 1, row + vmargin + 1, text)
        self.draw_box(col, row, boxwidth, boxheight)

    def draw_rightarrow(self, col, row, length, **kw):
        self.draw_hline(col, row, length - 1, **kw)
        self.set_char(col + length - 1, row, '>')

    def draw_leftarrow(self, col, row, length, **kw):
        self.draw_hline(col + 1, row, length - 1, **kw)
        self.set_char(col, row, '<')

    def draw_toparrow(self, col, row, length, **kw):
        self.draw_vline(col, row + 1, length - 1, **kw)
        self.set_char(col, row, '^')

    def draw_bottomarrow(self, col, row, length, **kw):
        self.draw_vline(col, row, length - 1, **kw)
        self.set_char(col, row + length - 1, 'v')


class ASCIIRenderer(Renderer):
    def __init__(self, diagram):
        self.diagram = diagram
        self._canvas = ASCIICanvas()

    def _getcolumns(self):
        raise NotImplementedError()

    def _render_header(self):
        self._canvas.extendtop(2)
        w = max(len(self.diagram.title), self._canvas.cols)
        self._canvas.write_hcenter(0, 0, self.diagram.title, w)

    def _render_sequence(self, dia):
        # Modules
        # columns
        # Total width
        # Title
        # Version
        # Author
        raise NotImplementedError()

    def render(self):
        for unit in self.diagram:
            if isinstance(unit, SequenceDiagram):
                self._render_sequence(unit)

        self._render_header()
        return self._canvas
