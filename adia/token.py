from collections import namedtuple


__all__ = []


EOF = 0
NAME = 1
NEWLINE = 2
AT = 3
DOT = 4
COLON = 5
RARROW = 9
INDENT = 10
DEDENT = 11
BACKSLASH = 12
PIPE = 14
HASH = 15
MULTILINE = 16
EVERYTHING = 17
TILDA = 18
HASHROCKET = 19
LPAR = 20
RPAR = 21
COMMA = 22
PLUS = 23
HSEP = 24

TOKEN_NAMES = {
    value: name for name, value in globals().items()
    if isinstance(value, int) and not name.startswith('_')
}


__all__.extend(TOKEN_NAMES.values())


EXACT_TOKENS = [
    ('---', HSEP),
    ('->', RARROW),
    ('=>', HASHROCKET),
    ('@', AT),
    (':', COLON),
    ('\\', BACKSLASH),
    ('|', PIPE),
    ('~', TILDA),
    ('#', HASH),
    ('.', DOT),
    ('(', LPAR),
    (')', RPAR),
    (',', COMMA),
    ('+', PLUS),
]
EXACT_TOKENS_DICT = {value: string for string, value in EXACT_TOKENS}


# Token namedtuple
class Token(namedtuple('Token', 'type string start end line')):
    def __repr__(self):
        return f'Token({TOKEN_NAMES[self.type]}, {self.string}, ' \
            f'{self.start}, {self.end}, {self.line})'
