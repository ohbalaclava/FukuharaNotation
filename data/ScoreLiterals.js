import { createEnum } from '../tools/Enum'

export const MarkType = createEnum('Note', 'Accidental', 'Stroke', 'Decoration', 'Join')
export const Join = createEnum('None', 'Arc', 'Line', 'DoubleLine')
export const Accidental = createEnum('Meri', 'None', 'Kari')
export const Stroke = createEnum('Dash', 'DoubleDash', 'TripleDash', 'QuadrupleDash', 'Tail', 'Wiggle', 'Dot', 'Tick')
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
        name: '七-alt',
        glyph: {
          source: require('../assets/numerals/nana-circled.png')
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
        source: require('../assets/marks/lean-to.png')
      }
    },
    {
      type: MarkType.Decoration,
      name: Decoration.Dot,
      glyph: {
        source: require('../assets/marks/dot.png')
      }
    }
  ],
  strokes: [
    {
      type: MarkType.Stroke,
      name: Stroke.Dash,
      glyph: {
        source: require('../assets/marks/dash.png')
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.DoubleDash,
      glyph: {
        source: require('../assets/marks/double-dash.png'),
        relativeHeight: 2
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.TripleDash,
      glyph: {
        source: require('../assets/marks/triple-dash.png'),
        relativeHeight: 2
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.QuadrupleDash,
      glyph: {
        source: require('../assets/marks/quadruple-dash.png'),
        relativeHeight: 3
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Dot,
      glyph: {
        source: require('../assets/marks/dot.png')
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Tick,
      glyph: {
        source: require('../assets/marks/tick.png')
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Wiggle,
      glyph: {
        source: require('../assets/marks/wiggle.png'),
        relativeHeight: 3
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Tail,
      glyph: {
        source: require('../assets/marks/tail.png'),
        relativeHeight: 3
      }
    }
  ],
  joins: [
    {
      type: MarkType.Join,
      name: Join.Arc,
      glyph: {
        startSource: require('../assets/stand-in.png'),
        middleSource: require('../assets/stand-in.png'),
        endSource: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Join,
      name: Join.Line,
      glyph: {
        startSource: require('../assets/stand-in.png'),
        middleSource: require('../assets/stand-in.png'),
        endSource: require('../assets/stand-in.png')
      }
    },
    {
      type: MarkType.Join,
      name: Join.DoubleLine,
      glyph: {
        startSource: require('../assets/stand-in.png'),
        middleSource: require('../assets/stand-in.png'),
        endSource: require('../assets/stand-in.png')
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
  ScoreMarks.strokes.forEach(glyphBuilder)
  ScoreMarks.joins.forEach(glyphBuilder)
})()

export function getGlyph (markName) {
  return glyphs.get(markName)
}
