import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native-web'

import styles from '../styles/ScreenStyles'

ImageButton.propTypes = {
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  styleGroup: PropTypes.string,
  buttonStyleName: PropTypes.string,
  otherStyle: PropTypes.object,
  pressedOpacity: PropTypes.number
}

export default function ImageButton ({ image, onPress, styleGroup, buttonStyleName, otherStyle, pressedOpacity }) {
  const buttonStyle = styles[styleGroup][buttonStyleName]
  otherStyle = otherStyle || {}

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, otherStyle]} activeOpacity={(pressedOpacity !== undefined) ? pressedOpacity : 0.5}>
      <View
        style={[
          buttonStyle.image,
          otherStyle.image,
          {
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }
        ]}/>
    </TouchableOpacity>
  )
}
