import m from 'mithril'

import ImageButton from '../components/ImageButton'
import { ScoreMarks } from '../data/ScoreLiterals'
import styles from '../styles/ScreenStyles'
import { dims } from '../data/dimensionsStore'
import Config from '../data/Config'

export default {
  view ({ attrs }) {
    const { addDecoration, refresh } = attrs

    return m('div.v.decorations-panel',
      ScoreMarks.decorations.map((item) => m(ImageButton, {
        key: item.name,
        highlightColour: Config.inputButtonHighlightColour,
        image: item.glyph.source,
        onPress: () => { addDecoration(item); refresh() },
        style: [styles.input.decorationButton, dims.getDecorationButtonStyle()]
      }))
    )
  }
}
