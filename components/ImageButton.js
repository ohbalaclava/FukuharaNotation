import React from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity } from 'react-native'

import styles from '../styles/ScreenStyles'

const ImageButton = ({ image, onPress, styleGroup, buttonStyleName }) => {
  const buttonStyle = styles[styleGroup][buttonStyleName]
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle]}>
      <Image style={[buttonStyle.image]} source={image} />
    </TouchableOpacity>
  )
}

ImageButton.propTypes = {
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  styleGroup: PropTypes.string,
  buttonStyleName: PropTypes.string.isRequired
}

export default ImageButton
