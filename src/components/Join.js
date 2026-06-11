import m from 'mithril'

import { dims } from '../data/dimensionsStore'
import { getGlyph, Join as JoinType } from '../data/ScoreLiterals'
import { toCSS } from '../styles/StyleUtils'

export default {
  view ({ attrs }) {
    if (attrs.join !== JoinType.None && attrs.size) {
      return m('img.score-join', {
        src: getGlyph(attrs.join).source,
        style: toCSS(dims.getJoinStyle(attrs.size))
      })
    }
    return null
  }
}
