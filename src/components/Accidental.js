import m from 'mithril'

import { dims } from '../data/dimensionsStore'
import { getGlyph } from '../data/ScoreLiterals'
import { toCSS } from '../styles/StyleUtils'

export default {
  view ({ attrs }) {
    return attrs.accidental
      ? m('img.score-accidental', {
        src: getGlyph(attrs.accidental.name).source,
        style: toCSS(dims.getAccidentalMarkStyle())
      })
      : null
  }
}
