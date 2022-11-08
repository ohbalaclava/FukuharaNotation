import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import RadioButtons from '../components/RadioButtons'
import { ScoreMarks } from '../data/ScoreLiterals'

JoinSelectView.propTypes = {
  setJoin: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function JoinSelectView ({ setJoin, refresh }) {
  const { dimensions } = useContext(DimensionsContext)
  const style = styles.input.marks.sections.joins

  function getButtonData () {
    return ScoreMarks.joins.map(value => {
      return {
        id: value.name,
        image: value.glyph.source
      }
    })
  }

  return (
    <RadioButtons
      buttonData={getButtonData()}
      onSelect={(joinButton) => { setJoin(joinButton.name); refresh() }}
      buttonStyles={dimensions.getJoinButtonStyle(style.button)}
      style={style}
    />
  )
}
