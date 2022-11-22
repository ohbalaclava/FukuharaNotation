import React, { useContext, useRef } from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import RadioButtons from '../components/RadioButtons'
import { Join, ScoreMarks } from '../data/ScoreLiterals'

JoinSelectView.propTypes = {
  setJoin: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function JoinSelectView ({ setJoin, refresh }) {
  const { dimensions } = useContext(DimensionsContext)
  const selectedJoin = useRef(Join.None)
  const style = styles.input.marks.sections.joins

  function getButtonData () {
    return ScoreMarks.joins.map(value => {
      return {
        id: value.name,
        image: value.glyph.source
      }
    })
  }

  function onSelect (joinId) {
    const join = joinId === RadioButtons.None ? Join.None : joinId
    selectedJoin.current = join
    setJoin(join)
    refresh()
  }

  return (
    <RadioButtons
      buttonData={getButtonData()}
      onSelect={onSelect}
      buttonStyles={dimensions.getJoinButtonStyle(style.button)}
      style={style}
      initialSelected={RadioButtons.None}
      allowUnselected={true}
    />
  )
}
