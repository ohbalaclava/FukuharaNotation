import { createEnum } from '../tools/Enum'

export const MarkType = createEnum('Note', 'Accidental', 'OtherUnit', 'OtherDecoration', 'Join')
export const Join = createEnum('None', 'Arc', 'Line', 'DoubleLine')
export const Accidental = createEnum('Meri', 'None', 'Kari')
export const OtherUnit = createEnum('Dash', 'DoubleDash', 'TripleDash', 'QuadrupleDash', 'Tail', 'Wiggle', 'Dot', 'Tick')
export const OtherDecoration = createEnum('LeanTo', 'Dot')
export const JoinPosition = createEnum('Start', 'Middle', 'End')

export const ScoreMarks = {
  notes: {
    ryo: [
      {
        type: MarkType.Note,
        name: 'rt',
        glyph: {
          white: require('../assets/numerals/white/dot-nana.png'),
          black: require('../assets/numerals/black/dot-nana.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'r1',
        glyph: {
          white: require('../assets/numerals/white/ichi.png'),
          black: require('../assets/numerals/black/ichi.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'r2',
        glyph: {
          white: require('../assets/numerals/white/ni.png'),
          black: require('../assets/numerals/black/ni.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'r3',
        glyph: {
          white: require('../assets/numerals/white/san.png'),
          black: require('../assets/numerals/black/san.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'r4',
        glyph: {
          white: require('../assets/numerals/white/shi.png'),
          black: require('../assets/numerals/black/shi.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'r5',
        glyph: {
          white: require('../assets/numerals/white/go.png'),
          black: require('../assets/numerals/black/go.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'r6',
        glyph: {
          white: require('../assets/numerals/white/roku.png'),
          black: require('../assets/numerals/black/roku.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'r7',
        glyph: {
          white: require('../assets/numerals/white/nana.png'),
          black: require('../assets/numerals/black/nana.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'r0',
        glyph: {
          white: require('../assets/numerals/white/zero.png'),
          black: require('../assets/numerals/black/zero.png')
        }
      }
    ],
    kan: [
      {
        type: MarkType.Note,
        name: 'k1',
        glyph: {
          white: require('../assets/numerals/white/one.png'),
          black: require('../assets/numerals/black/one.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'k2',
        glyph: {
          white: require('../assets/numerals/white/two.png'),
          black: require('../assets/numerals/black/two.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'k3',
        glyph: {
          white: require('../assets/numerals/white/three.png'),
          black: require('../assets/numerals/black/three.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'k4',
        glyph: {
          white: require('../assets/numerals/white/four.png'),
          black: require('../assets/numerals/black/four.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'k5',
        glyph: {
          white: require('../assets/numerals/white/five.png'),
          black: require('../assets/numerals/black/five.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'k6',
        glyph: {
          white: require('../assets/numerals/white/six.png'),
          black: require('../assets/numerals/black/six.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'k7',
        glyph: {
          white: require('../assets/numerals/white/seven.png'),
          black: require('../assets/numerals/black/seven.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'k0',
        glyph: {
          white: require('../assets/numerals/white/zero-dot.png'),
          black: require('../assets/numerals/black/zero-dot.png')
        }
      }
    ],
    daikan: [
      {
        type: MarkType.Note,
        name: 'd1',
        glyph: {
          white: require('../assets/numerals/white/eight.png'),
          black: require('../assets/numerals/black/eight.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'd2',
        glyph: {
          white: require('../assets/numerals/white/two-dot.png'),
          black: require('../assets/numerals/black/two-dot.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'd3',
        glyph: {
          white: require('../assets/numerals/white/three-dot.png'),
          black: require('../assets/numerals/black/three-dot.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'd4',
        glyph: {
          white: require('../assets/numerals/white/four-dot.png'),
          black: require('../assets/numerals/black/four-dot.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'd5',
        glyph: {
          white: require('../assets/numerals/white/five-dot.png'),
          black: require('../assets/numerals/black/five-dot.png')
        }
      },
      {
        type: MarkType.Note,
        name: 'd6',
        glyph: {
          white: require('../assets/numerals/white/six-dot.png'),
          black: require('../assets/numerals/black/six-dot.png')
        }
      }
    ]
  },
  accidentals: [
    {
      type: MarkType.Accidental,
      name: Accidental.Meri,
      glyph: {
        white: require('../assets/numerals/white/me.png'),
        black: require('../assets/numerals/black/me.png')
      }
    },
    {
      type: MarkType.Accidental,
      name: Accidental.Kari,
      glyph: {
        white: require('../assets/numerals/white/ka.png'),
        black: require('../assets/numerals/black/ka.png')
      }
    }
  ],
  otherDecorarions: [
    {
      type: MarkType.OtherDecoration,
      name: OtherDecoration.LeanTo,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.OtherDecoration,
      name: OtherDecoration.Dot,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    }
  ],
  otherUnits: [
    {
      type: MarkType.OtherUnit,
      name: OtherUnit.Dash,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.OtherUnit,
      name: OtherUnit.DoubleDash,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.OtherUnit,
      name: OtherUnit.TripleDash,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.OtherUnit,
      name: OtherUnit.QuadrupleDash,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.OtherUnit,
      name: OtherUnit.Dot,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.OtherUnit,
      name: OtherUnit.Tick,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.OtherUnit,
      name: OtherUnit.Wiggle,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.OtherUnit,
      name: OtherUnit.Tail,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    }
  ],
  joins: [
    {
      type: MarkType.Join,
      name: Join.Arc,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Join,
      name: Join.Line,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Join,
      name: Join.DoubleLine,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    }
  ]
}
