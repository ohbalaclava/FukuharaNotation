import React from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity } from 'react-native-web'

import styles from '../styles/ScreenStyles'

const ImageButton = ({ image, onPress, styleGroup, buttonStyleName, otherStyle }) => {
  const buttonStyle = styles[styleGroup][buttonStyleName]
  otherStyle = otherStyle || {}

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, otherStyle]}>
      <Image style={[buttonStyle.image, otherStyle.image]} source={image} />
    </TouchableOpacity>
  )
}

ImageButton.propTypes = {
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  styleGroup: PropTypes.string,
  buttonStyleName: PropTypes.string,
  otherStyle: PropTypes.object
}

export default ImageButton
