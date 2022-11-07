import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, TouchableHighlight } from 'react-native-web'
import deepmerge from '../tools/DeepMerge'

ImageButton.propTypes = {
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  pressedOpacity: PropTypes.number,
  highlightColour: PropTypes.string
}

export default function ImageButton ({ image, onPress, style, pressedOpacity, highlightColour }) {
  if (Array.isArray(style)) {
    style = deepmerge.all(style)
  }

  function getWrappedView () {
    return (
      <View
        style={[
          style.image,
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
      <TouchableHighlight underlayColor={highlightColour} onPress={onPress} style={style} activeOpacity={(pressedOpacity !== undefined) ? pressedOpacity : 0.5}>
        {getWrappedView()}
      </TouchableHighlight>
    )
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={style} activeOpacity={(pressedOpacity !== undefined) ? pressedOpacity : 0.5}>
        {getWrappedView()}
      </TouchableOpacity>
    )
  }
}
