from dial.ascii import ASCIIRenderer
from dial.diagram import Diagram

from .helpers import eqdia


def test_asciisequence_callstack():
    r = ASCIIRenderer(Diagram('''
        diagram: Foo
        version: 1.0
        sequence:

        foo.title: Foo
        foo -> bar
          bar -> thud
            thud -> qux
              qux -> quux
        foo -> qux
        foo -> quux
          quux -> qux
    '''))
    assert eqdia(r.dumps(), '''
    ...............................................
    . DIAGRAM: Foo                                .
    . version: 1.0                                .
    .                                             .
    . +-----+ +-----+ +-------+ +-----+ +-------+ .
    . | Foo | | bar | | thud  | | qux | | quux  | .
    . +-----+ +-----+ +-------+ +-----+ +-------+ .
    .    |       |        |        |        |     .
    .    |~~~~~~>|        |        |        |     .
    .    |       |~~~~~~~>|        |        |     .
    .    |       |        |~~~~~~~>|        |     .
    .    |       |        |        |~~~~~~~>|     .
    .    |       |        |        |        |     .
    .    |       |        |        |<-------|     .
    .    |       |        |<-------|        |     .
    .    |       |<-------|        |        |     .
    .    |<------|        |        |        |     .
    .    |       |        |        |        |     .
    .    |~~~~~~~~~~~~~~~~~~~~~~~~>|        |     .
    .    |       |        |        |        |     .
    .    |<------------------------|        |     .
    .    |       |        |        |        |     .
    .    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>|     .
    .    |       |        |        |        |     .
    .    |       |        |        |<~~~~~~~|     .
    .    |       |        |        |        |     .
    .    |       |        |        |------->|     .
    .    |       |        |        |        |     .
    .    |<---------------------------------|     .
    .    |       |        |        |        |     .
    . +-----+ +-----+ +-------+ +-----+ +-------+ .
    . | Foo | | bar | | thud  | | qux | | quux  | .
    . +-----+ +-----+ +-------+ +-----+ +-------+ .
    .                                             .
    ...............................................
    ''')


def test_asciisequence_call_notext():
    r = ASCIIRenderer(Diagram('''
        diagram: Foo
        version: 1.0
        sequence:

        f -> b
        foo -> bar
        foo -> b
        f -> bar
    '''))
    assert eqdia(r.dumps(), '''
    ...............................
    . DIAGRAM: Foo                .
    . version: 1.0                .
    .                             .
    . +---+ +---+ +-----+ +-----+ .
    . | f | | b | | foo | | bar | .
    . +---+ +---+ +-----+ +-----+ .
    .   |     |      |       |    .
    .   |~~~~>|      |       |    .
    .   |     |      |       |    .
    .   |<----|      |       |    .
    .   |     |      |       |    .
    .   |     |      |~~~~~~>|    .
    .   |     |      |       |    .
    .   |     |      |<------|    .
    .   |     |      |       |    .
    .   |     |<~~~~~|       |    .
    .   |     |      |       |    .
    .   |     |----->|       |    .
    .   |     |      |       |    .
    .   |~~~~~~~~~~~~~~~~~~~>|    .
    .   |     |      |       |    .
    .   |<-------------------|    .
    .   |     |      |       |    .
    . +---+ +---+ +-----+ +-----+ .
    . | f | | b | | foo | | bar | .
    . +---+ +---+ +-----+ +-----+ .
    .                             .
    ...............................
    ''')


def test_asciisequence_calltext_minimum():
    r = ASCIIRenderer(Diagram('''
        diagram: Foo
        version: 1.0
        sequence:

        f -> b: 1
        foo -> bar: 2
        foo -> b: 3
        f -> bar: 4
    '''))
    assert eqdia(r.dumps(), '''
    ..................................
    . DIAGRAM: Foo                   .
    . version: 1.0                   .
    .                                .
    . +---+  +---+  +-----+  +-----+ .
    . | f |  | b |  | foo |  | bar | .
    . +---+  +---+  +-----+  +-----+ .
    .   |      |       |        |    .
    .   |~~~1~>|       |        |    .
    .   |      |       |        |    .
    .   |<-----|       |        |    .
    .   |      |       |        |    .
    .   |      |       |~~~2~~~>|    .
    .   |      |       |        |    .
    .   |      |       |<-------|    .
    .   |      |       |        |    .
    .   |      |<~~3~~~|        |    .
    .   |      |       |        |    .
    .   |      |------>|        |    .
    .   |      |       |        |    .
    .   |~~~4~~~~~~~~~~~~~~~~~~>|    .
    .   |      |       |        |    .
    .   |<----------------------|    .
    .   |      |       |        |    .
    . +---+  +---+  +-----+  +-----+ .
    . | f |  | b |  | foo |  | bar | .
    . +---+  +---+  +-----+  +-----+ .
    .                                .
    ..................................
    ''')


def test_asciisequence_calltext():

    r = ASCIIRenderer(Diagram('''
        diagram: diaL demo
        version: 1.0
        author: pylover

        sequence:

        @foo: Start
        foo -> bar: hello() -> HI
          bar -> baz: hey() -> Hey

        @foo: End
    '''))
    assert eqdia(r.dumps(), '''
    ......................................
    . DIAGRAM: diaL demo                 .
    . author: pylover                    .
    . version: 1.0                       .
    .                                    .
    . +-----+       +-----+      +-----+ .
    . | foo |       | bar |      | baz | .
    . +-----+       +-----+      +-----+ .
    .    |             |            |    .
    . ---------        |            |    .
    . | Start |        |            |    .
    . ---------        |            |    .
    .    |             |            |    .
    .    |~~~hello()~~>|            |    .
    .    |             |~~~hey()~~~>|    .
    .    |             |            |    .
    .    |             |<--Hey------|    .
    .    |<--HI--------|            |    .
    .    |             |            |    .
    . -------          |            |    .
    . | End |          |            |    .
    . -------          |            |    .
    .    |             |            |    .
    . +-----+       +-----+      +-----+ .
    . | foo |       | bar |      | baz | .
    . +-----+       +-----+      +-----+ .
    .                                    .
    ......................................
    ''')

    r = ASCIIRenderer(Diagram('''
        diagram: Foo
        version: 1.0
        sequence:

        f -> b: init()
        foo -> bar: init()
        foo -> b: init()
        f -> bar: 010101010101010101010101010101010101
    '''))
    assert eqdia(r.dumps(), '''
    .......................................................
    . DIAGRAM: Foo                                        .
    . version: 1.0                                        .
    .                                                     .
    . +---+       +---+       +-----+             +-----+ .
    . | f |       | b |       | foo |             | bar | .
    . +---+       +---+       +-----+             +-----+ .
    .   |           |            |                   |    .
    .   |~~~init()~>|            |                   |    .
    .   |           |            |                   |    .
    .   |<----------|            |                   |    .
    .   |           |            |                   |    .
    .   |           |            |~~~init()~~~~~~~~~>|    .
    .   |           |            |                   |    .
    .   |           |            |<------------------|    .
    .   |           |            |                   |    .
    .   |           |<~~init()~~~|                   |    .
    .   |           |            |                   |    .
    .   |           |----------->|                   |    .
    .   |           |            |                   |    .
    .   |~~~010101010101010101010101010101010101~~~~>|    .
    .   |           |            |                   |    .
    .   |<-------------------------------------------|    .
    .   |           |            |                   |    .
    . +---+       +---+       +-----+             +-----+ .
    . | f |       | b |       | foo |             | bar | .
    . +---+       +---+       +-----+             +-----+ .
    .                                                     .
    .......................................................
    ''')


def test_asciisequence_callreturntext():
    r = ASCIIRenderer(Diagram('''
        diagram: Foo
        version: 1.0
        sequence:

        f -> b: init() -> int
        foo -> bar: init() -> Object
        foo -> b: init()
        f -> bar: 0101 -> 010101010101010101010101010101010101
    '''))
    assert eqdia(r.dumps(), '''
    .......................................................
    . DIAGRAM: Foo                                        .
    . version: 1.0                                        .
    .                                                     .
    . +---+       +---+       +-----+             +-----+ .
    . | f |       | b |       | foo |             | bar | .
    . +---+       +---+       +-----+             +-----+ .
    .   |           |            |                   |    .
    .   |~~~init()~>|            |                   |    .
    .   |           |            |                   |    .
    .   |<--int-----|            |                   |    .
    .   |           |            |                   |    .
    .   |           |            |~~~init()~~~~~~~~~>|    .
    .   |           |            |                   |    .
    .   |           |            |<--Object----------|    .
    .   |           |            |                   |    .
    .   |           |<~~init()~~~|                   |    .
    .   |           |            |                   |    .
    .   |           |----------->|                   |    .
    .   |           |            |                   |    .
    .   |~~~0101~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>|    .
    .   |           |            |                   |    .
    .   |<--010101010101010101010101010101010101-----|    .
    .   |           |            |                   |    .
    . +---+       +---+       +-----+             +-----+ .
    . | f |       | b |       | foo |             | bar | .
    . +---+       +---+       +-----+             +-----+ .
    .                                                     .
    .......................................................
    ''')


def test_asciisequence_selfcall():
    r = ASCIIRenderer(Diagram('''
        diagram: Foo
        version: 1.0
        sequence:

        foo -> foo: init()
        bar -> bar:
    '''))
    assert eqdia(r.dumps(), '''
    ...............................
    . DIAGRAM: Foo                .
    . version: 1.0                .
    .                             .
    . +-----+         +-----+     .
    . | foo |         | bar |     .
    . +-----+         +-----+     .
    .    |               |        .
    .    |~~~init()~~~+  |        .
    .    |            |  |        .
    .    |<-----------+  |        .
    .    |               |        .
    .    |               |~~~~~~+ .
    .    |               |      | .
    .    |               |<-----+ .
    .    |               |        .
    . +-----+         +-----+     .
    . | foo |         | bar |     .
    . +-----+         +-----+     .
    .                             .
    ...............................
    ''')


def test_asciisequence_selfcall_returntext():
    r = ASCIIRenderer(Diagram('''
        diagram: Foo
        version: 1.0
        sequence:

        foo -> foo: init() -> error/zero
        bar -> bar: -> Exception
    '''))
    assert eqdia(r.dumps(), '''
    ............................................
    . DIAGRAM: Foo                             .
    . version: 1.0                             .
    .                                          .
    . +-----+             +-----+              .
    . | foo |             | bar |              .
    . +-----+             +-----+              .
    .    |                   |                 .
    .    |~~~init()~~~~~~~+  |                 .
    .    |                |  |                 .
    .    |<--error/zero---+  |                 .
    .    |                   |                 .
    .    |                   |~~~~~~~~~~~~~~~+ .
    .    |                   |               | .
    .    |                   |<--Exception---+ .
    .    |                   |                 .
    . +-----+             +-----+              .
    . | foo |             | bar |              .
    . +-----+             +-----+              .
    .                                          .
    ............................................
    ''')
