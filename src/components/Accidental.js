import React, { useContext } from 'react'
import { Image } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import { getGlyph } from '../data/ScoreLiterals'

Accidental.propTypes = {
  accidental: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
}

export default function Accidental ({ accidental }) {
  const { dimensions } = useContext(DimensionsContext)

  return (accidental) ? <Image style={[styles.score.accidental, dimensions.getAccidentalMarkStyle()]} source={getGlyph(accidental.name).source} /> : <noscript />
}
