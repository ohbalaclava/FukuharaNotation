import React, { useContext } from 'react'
import { Image } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import { getGlyph, Join as JoinType } from '../data/ScoreLiterals'

Join.propTypes = {
  join: PropTypes.string.isRequired
}

export default function Join ({ join }) {
  const { dimensions } = useContext(DimensionsContext)

  return (join !== JoinType.None) ? <Image style={[styles.score.accidental, dimensions.getAccidentalMarkStyle()]} source={getGlyph(join).source} /> : <noscript />
}
