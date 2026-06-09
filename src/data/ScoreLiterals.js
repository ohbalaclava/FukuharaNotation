import { createEnum } from '../tools/Enum'

export const MarkType = createEnum('Note', 'Accidental', 'Stroke', 'Decoration', 'Join')
export const Join = createEnum('None', 'Arc', 'Line', 'DoubleLine', 'TripleLine')
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
          source: new URL('../assets/numerals/dot-nana.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '一',
        glyph: {
          source: new URL('../assets/numerals/ichi.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '二',
        glyph: {
          source: new URL('../assets/numerals/ni.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '三',
        glyph: {
          source: new URL('../assets/numerals/san.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '四',
        glyph: {
          source: new URL('../assets/numerals/shi.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '五',
        glyph: {
          source: new URL('../assets/numerals/go.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '六',
        glyph: {
          source: new URL('../assets/numerals/roku.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '七',
        glyph: {
          source: new URL('../assets/numerals/nana.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '七-alt',
        glyph: {
          source: new URL('../assets/numerals/nana-circled.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '0',
        glyph: {
          source: new URL('../assets/numerals/zero.png', import.meta.url).href
        }
      }
    ],
    kan: [
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '1',
        glyph: {
          source: new URL('../assets/numerals/one.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '2',
        glyph: {
          source: new URL('../assets/numerals/two.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '3',
        glyph: {
          source: new URL('../assets/numerals/three.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '4',
        glyph: {
          source: new URL('../assets/numerals/four.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '5',
        glyph: {
          source: new URL('../assets/numerals/five.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '6',
        glyph: {
          source: new URL('../assets/numerals/six.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '7',
        glyph: {
          source: new URL('../assets/numerals/seven.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '0dot',
        glyph: {
          source: new URL('../assets/numerals/zero-dot.png', import.meta.url).href
        }
      }
    ],
    daikan: [
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '8',
        glyph: {
          source: new URL('../assets/numerals/eight.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '2dot',
        glyph: {
          source: new URL('../assets/numerals/two-dot.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '3dot',
        glyph: {
          source: new URL('../assets/numerals/three-dot.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '4dot',
        glyph: {
          source: new URL('../assets/numerals/four-dot.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '5dot',
        glyph: {
          source: new URL('../assets/numerals/five-dot.png', import.meta.url).href
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '6dot',
        glyph: {
          source: new URL('../assets/numerals/six-dot.png', import.meta.url).href
        }
      }
    ]
  },
  accidentals: [
    {
      type: MarkType.Accidental,
      name: Accidental.Meri,
      glyph: {
        source: new URL('../assets/numerals/me.png', import.meta.url).href
      }
    },
    {
      type: MarkType.Accidental,
      name: Accidental.Kari,
      glyph: {
        source: new URL('../assets/numerals/ka.png', import.meta.url).href
      }
    }
  ],
  decorations: [
    {
      type: MarkType.Decoration,
      name: Decoration.LeanTo,
      glyph: {
        source: new URL('../assets/marks/lean-to.png', import.meta.url).href
      }
    },
    {
      type: MarkType.Decoration,
      name: Decoration.Dot,
      glyph: {
        source: new URL('../assets/marks/dot.png', import.meta.url).href
      }
    }
  ],
  strokes: [
    {
      type: MarkType.Stroke,
      name: Stroke.Dash,
      glyph: {
        source: new URL('../assets/marks/dash.png', import.meta.url).href
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.DoubleDash,
      glyph: {
        source: new URL('../assets/marks/double-dash.png', import.meta.url).href,
        relativeHeight: 2
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.TripleDash,
      glyph: {
        source: new URL('../assets/marks/triple-dash.png', import.meta.url).href,
        relativeHeight: 2
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.QuadrupleDash,
      glyph: {
        source: new URL('../assets/marks/quadruple-dash.png', import.meta.url).href,
        relativeHeight: 3
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Dot,
      glyph: {
        source: new URL('../assets/marks/dot.png', import.meta.url).href
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Tick,
      glyph: {
        source: new URL('../assets/marks/tick.png', import.meta.url).href
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Wiggle,
      glyph: {
        source: new URL('../assets/marks/wiggle.png', import.meta.url).href,
        relativeHeight: 3
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Tail,
      glyph: {
        source: new URL('../assets/marks/tail.png', import.meta.url).href,
        relativeHeight: 3
      }
    }
  ],
  joins: [
    {
      type: MarkType.Join,
      name: Join.Arc,
      glyph: {
        source: new URL('../assets/marks/join_arc.png', import.meta.url).href
      }
    },
    {
      type: MarkType.Join,
      name: Join.Line,
      glyph: {
        source: new URL('../assets/marks/join_single.png', import.meta.url).href
      }
    },
    {
      type: MarkType.Join,
      name: Join.DoubleLine,
      glyph: {
        source: new URL('../assets/marks/join_double.png', import.meta.url).href
      }
    },
    {
      type: MarkType.Join,
      name: Join.TripleLine,
      glyph: {
        source: new URL('../assets/marks/join_triple.png', import.meta.url).href
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
