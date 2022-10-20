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
          source: require('../assets/numerals/dot-nana.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '一',
        glyph: {
          source: require('../assets/numerals/ichi.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '二',
        glyph: {
          source: require('../assets/numerals/ni.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '三',
        glyph: {
          source: require('../assets/numerals/san.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '四',
        glyph: {
          source: require('../assets/numerals/shi.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '五',
        glyph: {
          source: require('../assets/numerals/go.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '六',
        glyph: {
          source: require('../assets/numerals/roku.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '七',
        glyph: {
          source: require('../assets/numerals/nana.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '0',
        glyph: {
          source: require('../assets/numerals/zero.png')
        }
      }
    ],
    kan: [
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '1',
        glyph: {
          source: require('../assets/numerals/one.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '2',
        glyph: {
          source: require('../assets/numerals/two.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '3',
        glyph: {
          source: require('../assets/numerals/three.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '4',
        glyph: {
          source: require('../assets/numerals/four.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '5',
        glyph: {
          source: require('../assets/numerals/five.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '6',
        glyph: {
          source: require('../assets/numerals/six.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '7',
        glyph: {
          source: require('../assets/numerals/seven.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '0dot',
        glyph: {
          source: require('../assets/numerals/zero-dot.png')
        }
      }
    ],
    daikan: [
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '8',
        glyph: {
          source: require('../assets/numerals/eight.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '2dot',
        glyph: {
          source: require('../assets/numerals/two-dot.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '3dot',
        glyph: {
          source: require('../assets/numerals/three-dot.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '4dot',
        glyph: {
          source: require('../assets/numerals/four-dot.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '5dot',
        glyph: {
          source: require('../assets/numerals/five-dot.png')
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '6dot',
        glyph: {
          source: require('../assets/numerals/six-dot.png')
        }
      }
    ]
  },
  accidentals: [
    {
      type: MarkType.Accidental,
      name: Accidental.Meri,
      glyph: {
        source: require('../assets/numerals/me.png')
      }
    },
    {
      type: MarkType.Accidental,
      name: Accidental.Kari,
      glyph: {
        source: require('../assets/numerals/ka.png')
      }
    }
  ],
  decorations: [
    {
      type: MarkType.Decoration,
      name: Decoration.LeanTo,
      glyph: {
        source: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Decoration,
      name: Decoration.Dot,
      glyph: {
        source: require('../assets/stand-in.png')
      }
    }
  ],
  units: [
    {
      type: MarkType.Unit,
      name: Unit.Dash,
      glyph: {
        source: require('../assets/marks/dash.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.DoubleDash,
      glyph: {
        source: require('../assets/marks/double-dash.png'),
        height: 1.75
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.TripleDash,
      glyph: {
        source: require('../assets/marks/triple-dash.png'),
        height: 1.75
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.QuadrupleDash,
      glyph: {
        source: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.Dot,
      glyph: {
        source: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.Tick,
      glyph: {
        source: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.Wiggle,
      glyph: {
        source: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Unit,
      name: Unit.Tail,
      glyph: {
        source: require('../assets/stand-in.png')
      }
    }
  ],
  joins: [
    {
      type: MarkType.Join,
      name: Join.Arc,
      glyph: {
        source: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Join,
      name: Join.Line,
      glyph: {
        source: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Join,
      name: Join.DoubleLine,
      glyph: {
        source: require('../assets/stand-in.png')
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
