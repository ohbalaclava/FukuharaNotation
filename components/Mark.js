import React, { useContext } from 'react'
import { View, Image } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'

Accidental.propTypes = {
  accidental: PropTypes.shape({
    glyph: PropTypes.shape({
      black: PropTypes.string.isRequired
    }).isRequired
  })
}

function Accidental ({ accidental }) {
  return (accidental) ? <Image style={[styles.score.accidental]} source={accidental.glyph.black} /> : <noscript />
}

Mark.propTypes = {
  mark: PropTypes.shape({
    data: PropTypes.shape({
      accidental: PropTypes.object,
      glyph: PropTypes.shape({
        black: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default function Mark ({ mark, onPress }) {
  const { dimensions } = useContext(DimensionsContext)

  return (
    <View>
      <ImageButton
        image={mark.data.glyph.black}
        onPress={() => onPress()}
        buttonStyleName='mark'
        styleGroup='score'
        otherStyle={dimensions.getNoteMarkStyle()}
      />
      <Accidental accidental={mark.data.accidental}/>
    </View>
  )
}
