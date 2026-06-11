import m from 'mithril'

import ImageButton from './ImageButton'
import { dims } from '../data/dimensionsStore'
import { getGlyph } from '../data/ScoreLiterals'
import Accidental from './Accidental'
import Decorations from './Decorations'
import styles from '../styles/ScreenStyles'
import Join from './Join'

export default {
  view ({ attrs }) {
    const mark = attrs.mark
    const glyph = getGlyph(mark.name)

    return m('div.v', [
      m(Accidental, { accidental: mark.accidental }),
      m(Decorations, { decorations: mark.decorations, hasAccidental: mark.accidental !== undefined }),
      m(Join, { join: mark.join, size: mark.joinLength }),
      m(ImageButton, {
        image: glyph.source,
        onPress: () => attrs.onPress(),
        style: [styles.score.mark, dims.getNoteMarkStyle(glyph.relativeHeight)]
      })
    ])
  }
}
