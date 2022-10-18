import { createEnum } from '../tools/Enum'

export const MarkType = createEnum('Note', 'Accidental', 'Unit', 'Decoration', 'Join')
export const Join = createEnum('None', 'Arc', 'Line', 'DoubleLine')
export const Accidental = createEnum('Meri', 'None', 'Kari')
export const Unit = createEnum('Dash', 'DoubleDash', 'TripleDash', 'QuadrupleDash', 'Tail', 'Wiggle', 'Dot', 'Tick')
export const Decoration = createEnum('LeanTo', 'Dot')
export const JoinPosition = createEnum('Start', 'Middle', 'End')
export const On = createEnum('Ryo', 'Kan', 'Daikan')

export const ScoreMarks = {
  notes: {
    ryo: [
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: 'tsutsune',
        glyph: {
          white: require('../assets/numerals/white/dot-nana.png'),
          black: require('../assets/numerals/black/dot-nana.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '一',
        glyph: {
          white: require('../assets/numerals/white/ichi.png'),
          black: require('../assets/numerals/black/ichi.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '二',
        glyph: {
          white: require('../assets/numerals/white/ni.png'),
          black: require('../assets/numerals/black/ni.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '三',
        glyph: {
          white: require('../assets/numerals/white/san.png'),
          black: require('../assets/numerals/black/san.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '四',
        glyph: {
          white: require('../assets/numerals/white/shi.png'),
          black: require('../assets/numerals/black/shi.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '五',
        glyph: {
          white: require('../assets/numerals/white/go.png'),
          black: require('../assets/numerals/black/go.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '六',
        glyph: {
          white: require('../assets/numerals/white/roku.png'),
          black: require('../assets/numerals/black/roku.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '七',
        glyph: {
          white: require('../assets/numerals/white/nana.png'),
          black: require('../assets/numerals/black/nana.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '0',
        glyph: {
          white: require('../assets/numerals/white/zero.png'),
          black: require('../assets/numerals/black/zero.png')
        }
      }
    ],
    kan: [
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '1',
        glyph: {
          white: require('../assets/numerals/white/one.png'),
          black: require('../assets/numerals/black/one.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '2',
        glyph: {
          white: require('../assets/numerals/white/two.png'),
          black: require('../assets/numerals/black/two.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '3',
        glyph: {
          white: require('../assets/numerals/white/three.png'),
          black: require('../assets/numerals/black/three.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '4',
        glyph: {
          white: require('../assets/numerals/white/four.png'),
          black: require('../assets/numerals/black/four.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '5',
        glyph: {
          white: require('../assets/numerals/white/five.png'),
          black: require('../assets/numerals/black/five.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '6',
        glyph: {
          white: require('../assets/numerals/white/six.png'),
          black: require('../assets/numerals/black/six.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '7',
        glyph: {
          white: require('../assets/numerals/white/seven.png'),
          black: require('../assets/numerals/black/seven.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '0dot',
        glyph: {
          white: require('../assets/numerals/white/zero-dot.png'),
          black: require('../assets/numerals/black/zero-dot.png')
        }
      }
    ],
    daikan: [
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '8',
        glyph: {
          white: require('../assets/numerals/white/eight.png'),
          black: require('../assets/numerals/black/eight.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '2dot',
        glyph: {
          white: require('../assets/numerals/white/two-dot.png'),
          black: require('../assets/numerals/black/two-dot.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '3dot',
        glyph: {
          white: require('../assets/numerals/white/three-dot.png'),
          black: require('../assets/numerals/black/three-dot.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '4dot',
        glyph: {
          white: require('../assets/numerals/white/four-dot.png'),
          black: require('../assets/numerals/black/four-dot.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '5dot',
        glyph: {
          white: require('../assets/numerals/white/five-dot.png'),
          black: require('../assets/numerals/black/five-dot.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '6dot',
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
  decorations: [
    {
      type: MarkType.Decoration,
      name: Decoration.LeanTo,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Decoration,
      name: Decoration.Dot,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    }
  ],
  units: [
    {
      type: MarkType.Unit,
      name: Unit.Dash,
      glyph: {
        white: require('../assets/marks/white/dash.png'),
        black: require('../assets/marks/black/dash.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.DoubleDash,
      glyph: {
        white: require('../assets/marks/white/double-dash.png'),
        black: require('../assets/marks/black/double-dash.png'),
        height: 1.5
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.TripleDash,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.QuadrupleDash,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.Dot,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.Tick,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.Wiggle,
      glyph: {
        white: require('../assets/stand-in.png'),
        black: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.Tail,
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

const glyphs = new Map();

(function () {
  const glyphBuilder = (item) => {
    glyphs.set(item.name, item.glyph)
  }

  ScoreMarks.notes.ryo.forEach(glyphBuilder)
  ScoreMarks.notes.kan.forEach(glyphBuilder)
  ScoreMarks.notes.daikan.forEach(glyphBuilder)
  ScoreMarks.accidentals.forEach(glyphBuilder)
  ScoreMarks.decorations.forEach(glyphBuilder)
  ScoreMarks.units.forEach(glyphBuilder)
  ScoreMarks.joins.forEach(glyphBuilder)
})()

export function getGlyph (markName) {
  return glyphs.get(markName)
}

export function getWhiteGlyph (markName) {
  return glyphs.get(markName).white
}

export function getBlackGlyph (markName) {
  return glyphs.get(markName).black
}
