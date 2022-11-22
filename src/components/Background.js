import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native-web'

Background.propTypes = {
  resizeMode: PropTypes.string,
  source: PropTypes.string,
  border: PropTypes.shape({
    colour: PropTypes.string,
    radius: PropTypes.number,
    width: PropTypes.number
  }),
  height: PropTypes.number,
  width: PropTypes.number
}

export default function Background ({ resizeMode, height, width, source, border }) {
  const imageStyle = {
    flex: 1,
    resizeMode
  }
  if (border) {
    imageStyle.borderRadius = border.radius
    imageStyle.borderColor = border.colour
    imageStyle.borderWidth = border.width
  }

  height = height || '100%'
  width = width || '100%'

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height
    }}>
      <Image
        style={imageStyle}
        source={source}
      />
    </View>
  )
}
