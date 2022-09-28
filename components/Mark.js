import React from 'react'
import { View, Image } from 'react-native'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import styles from '../styles/ScreenStyles'

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
  }).isRequired
}

export default function Mark ({ mark }) {
  return (
    <View>
      <ImageButton
        image={mark.data.glyph.black}
        onPress={() => { }}
        buttonStyleName='mark'
        styleGroup='score'
      />
      <Accidental accidental={mark.data.accidental}/>
    </View>
  )
}
