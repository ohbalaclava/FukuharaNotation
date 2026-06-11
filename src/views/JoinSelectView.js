import m from 'mithril'

import styles from '../styles/ScreenStyles'
import { dims } from '../data/dimensionsStore'
import RadioButtons from '../components/RadioButtons'
import { Join, ScoreMarks } from '../data/ScoreLiterals'

export default {
  view ({ attrs }) {
    const { setJoin, refresh } = attrs

    const buttonData = ScoreMarks.joins.map((value) => ({
      id: value.name,
      image: value.glyph.source
    }))

    const onSelect = (joinId) => {
      const join = joinId === RadioButtons.None ? Join.None : joinId
      setJoin(join)
      refresh()
    }

    return m(RadioButtons, {
      buttonData,
      onSelect,
      buttonStyles: dims.getJoinButtonStyle(styles.input.joinButton),
      class: 'joins-panel',
      initialSelected: RadioButtons.None,
      allowUnselected: true
    })
  }
}
