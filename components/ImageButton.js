import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, TouchableHighlight } from 'react-native-web'

import styles from '../styles/ScreenStyles'

ImageButton.propTypes = {
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  styleGroup: PropTypes.string,
  buttonStyleName: PropTypes.string,
  otherStyle: PropTypes.object,
  pressedOpacity: PropTypes.number,
  highlightColour: PropTypes.string
}

export default function ImageButton ({ image, onPress, styleGroup, buttonStyleName, otherStyle, pressedOpacity, highlightColour }) {
  const buttonStyle = styles[styleGroup][buttonStyleName]
  otherStyle = otherStyle || {}

  function getWrappedView () {
    return (
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
        ]}
      />
    )
  }

  if (highlightColour) {
    return (
      <TouchableHighlight underlayColor={highlightColour} onPress={onPress} style={[buttonStyle, otherStyle]} activeOpacity={(pressedOpacity !== undefined) ? pressedOpacity : 0.5}>
        {getWrappedView()}
      </TouchableHighlight>
    )
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={[buttonStyle, otherStyle]} activeOpacity={(pressedOpacity !== undefined) ? pressedOpacity : 0.5}>
        {getWrappedView()}
      </TouchableOpacity>
    )
  }
}
