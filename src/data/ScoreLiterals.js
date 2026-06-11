import { createEnum } from '../tools/Enum'

import dotNanaPng from '../assets/numerals/dot-nana.png'
import ichiPng from '../assets/numerals/ichi.png'
import niPng from '../assets/numerals/ni.png'
import sanPng from '../assets/numerals/san.png'
import shiPng from '../assets/numerals/shi.png'
import goPng from '../assets/numerals/go.png'
import rokuPng from '../assets/numerals/roku.png'
import nanaPng from '../assets/numerals/nana.png'
import nanaCircledPng from '../assets/numerals/nana-circled.png'
import zeroPng from '../assets/numerals/zero.png'
import onePng from '../assets/numerals/one.png'
import twoPng from '../assets/numerals/two.png'
import threePng from '../assets/numerals/three.png'
import fourPng from '../assets/numerals/four.png'
import fivePng from '../assets/numerals/five.png'
import sixPng from '../assets/numerals/six.png'
import sevenPng from '../assets/numerals/seven.png'
import zeroDotPng from '../assets/numerals/zero-dot.png'
import eightPng from '../assets/numerals/eight.png'
import twoDotPng from '../assets/numerals/two-dot.png'
import threeDotPng from '../assets/numerals/three-dot.png'
import fourDotPng from '../assets/numerals/four-dot.png'
import fiveDotPng from '../assets/numerals/five-dot.png'
import sixDotPng from '../assets/numerals/six-dot.png'
import mePng from '../assets/numerals/me.png'
import kaPng from '../assets/numerals/ka.png'
import leanToPng from '../assets/marks/lean-to.png'
import dotPng from '../assets/marks/dot.png'
import dashPng from '../assets/marks/dash.png'
import doubleDashPng from '../assets/marks/double-dash.png'
import tripleDashPng from '../assets/marks/triple-dash.png'
import quadrupleDashPng from '../assets/marks/quadruple-dash.png'
import tickPng from '../assets/marks/tick.png'
import wigglePng from '../assets/marks/wiggle.png'
import tailPng from '../assets/marks/tail.png'
import joinArcPng from '../assets/marks/join_arc.png'
import joinSinglePng from '../assets/marks/join_single.png'
import joinDoublePng from '../assets/marks/join_double.png'
import joinTriplePng from '../assets/marks/join_triple.png'

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
          source: dotNanaPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '一',
        glyph: {
          source: ichiPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '二',
        glyph: {
          source: niPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '三',
        glyph: {
          source: sanPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '四',
        glyph: {
          source: shiPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '五',
        glyph: {
          source: goPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '六',
        glyph: {
          source: rokuPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '七',
        glyph: {
          source: nanaPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '七-alt',
        glyph: {
          source: nanaCircledPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Ryo,
        name: '0',
        glyph: {
          source: zeroPng
        }
      }
    ],
    kan: [
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '1',
        glyph: {
          source: onePng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '2',
        glyph: {
          source: twoPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '3',
        glyph: {
          source: threePng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '4',
        glyph: {
          source: fourPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '5',
        glyph: {
          source: fivePng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '6',
        glyph: {
          source: sixPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '7',
        glyph: {
          source: sevenPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Kan,
        name: '0dot',
        glyph: {
          source: zeroDotPng
        }
      }
    ],
    daikan: [
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '8',
        glyph: {
          source: eightPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '2dot',
        glyph: {
          source: twoDotPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '3dot',
        glyph: {
          source: threeDotPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '4dot',
        glyph: {
          source: fourDotPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '5dot',
        glyph: {
          source: fiveDotPng
        }
      },
      {
        type: MarkType.Note,
        octave: On.Daikan,
        name: '6dot',
        glyph: {
          source: sixDotPng
        }
      }
    ]
  },
  accidentals: [
    {
      type: MarkType.Accidental,
      name: Accidental.Meri,
      glyph: {
        source: mePng
      }
    },
    {
      type: MarkType.Accidental,
      name: Accidental.Kari,
      glyph: {
        source: kaPng
      }
    }
  ],
  decorations: [
    {
      type: MarkType.Decoration,
      name: Decoration.LeanTo,
      glyph: {
        source: leanToPng
      }
    },
    {
      type: MarkType.Decoration,
      name: Decoration.Dot,
      glyph: {
        source: dotPng
      }
    }
  ],
  strokes: [
    {
      type: MarkType.Stroke,
      name: Stroke.Dash,
      glyph: {
        source: dashPng
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.DoubleDash,
      glyph: {
        source: doubleDashPng,
        relativeHeight: 2
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.TripleDash,
      glyph: {
        source: tripleDashPng,
        relativeHeight: 2
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.QuadrupleDash,
      glyph: {
        source: quadrupleDashPng,
        relativeHeight: 3
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Dot,
      glyph: {
        source: dotPng
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Tick,
      glyph: {
        source: tickPng
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Wiggle,
      glyph: {
        source: wigglePng,
        relativeHeight: 3
      }
    },
    {
      type: MarkType.Stroke,
      name: Stroke.Tail,
      glyph: {
        source: tailPng,
        relativeHeight: 3
      }
    }
  ],
  joins: [
    {
      type: MarkType.Join,
      name: Join.Arc,
      glyph: {
        source: joinArcPng
      }
    },
    {
      type: MarkType.Join,
      name: Join.Line,
      glyph: {
        source: joinSinglePng
      }
    },
    {
      type: MarkType.Join,
      name: Join.DoubleLine,
      glyph: {
        source: joinDoublePng
      }
    },
    {
      type: MarkType.Join,
      name: Join.TripleLine,
      glyph: {
        source: joinTriplePng
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
