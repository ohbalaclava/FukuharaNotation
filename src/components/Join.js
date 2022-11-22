import React, { useContext } from 'react'
import { Image } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import { getGlyph, Join as JoinType } from '../data/ScoreLiterals'

Join.propTypes = {
  join: PropTypes.string.isRequired,
  size: PropTypes.number
}

export default function Join ({ join, size }) {
  const { dimensions } = useContext(DimensionsContext)

  if (join !== JoinType.None && size) {
    return <Image style={[styles.score.join, dimensions.getJoinStyle(size)]} source={getGlyph(join).source} />
  }
}
