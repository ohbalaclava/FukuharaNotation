import React, { useContext } from 'react'
import { View, Image } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import { getGlyph } from '../data/ScoreLiterals'

Accidental.propTypes = {
  accidental: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
}

function Accidental ({ accidental }) {
  return (accidental) ? <Image style={[styles.score.accidental]} source={getGlyph(accidental.name).source} /> : <noscript />
}

Mark.propTypes = {
  mark: PropTypes.shape({
    name: PropTypes.string.isRequired,
    accidental: PropTypes.object
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default function Mark ({ mark, onPress }) {
  const { dimensions } = useContext(DimensionsContext)

  const glyph = getGlyph(mark.name)

  return (
    <View>
      <ImageButton
        image={glyph.source}
        onPress={() => onPress()}
        buttonStyleName='mark'
        styleGroup='score'
        otherStyle={dimensions.getNoteMarkStyle(glyph.height)}
      />
      <Accidental accidental={mark.accidental}/>
    </View>
  )
}
