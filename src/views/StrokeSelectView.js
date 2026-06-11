import m from 'mithril'

import { ScoreMarks } from '../data/ScoreLiterals'
import { dims } from '../data/dimensionsStore'
import ImageButton from '../components/ImageButton'
import Config from '../data/Config'
import GridView from './GridView'
import styles from '../styles/ScreenStyles'
import DecorationSelectView from './DecorationSelectView'
import JoinSelectView from './JoinSelectView'

export default {
  view ({ attrs }) {
    const { addStroke, addDecoration, setJoin, refresh } = attrs

    const renderStrokeButton = (item) => m(ImageButton, {
      key: item.name,
      highlightColour: Config.inputButtonHighlightColour,
      image: item.glyph.source,
      onPress: () => { addStroke(item); refresh() },
      style: [styles.input.strokeButton, dims.getStrokeButtonStyle(item.glyph.relativeHeight)]
    })

    return m('div.v.strokes-panel', [
      m(GridView, {
        items: ScoreMarks.strokes,
        renderItem: renderStrokeButton,
        noRows: 4
      }),
      m('div.v', [
        m(JoinSelectView, { setJoin, refresh }),
        m(DecorationSelectView, { addDecoration, refresh })
      ])
    ])
  }
}
