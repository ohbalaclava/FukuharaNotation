import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native-web'
import PropTypes from 'prop-types'

RadioButtons.propTypes = {
  buttonData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    image: PropTypes.string
  })),
  onSelect: PropTypes.func,
  buttonStyles: PropTypes.shape({
    selected: PropTypes.object,
    unselected: PropTypes.object
  }),
  initialSelected: PropTypes.string,
  style: PropTypes.object,
  allowUnselected: PropTypes.bool
}

export default function RadioButtons ({ buttonData, onSelect, buttonStyles, initialSelected, style, allowUnselected }) {
  const [selectedItemId, setSelectedItemId] = useState(() => initialSelected || buttonData[0].id)

  const selectHandler = (item) => {
    if (selectedItemId === item.id && allowUnselected) {
      onSelect(RadioButtons.None)
      setSelectedItemId(RadioButtons.None)
    } else if (selectedItemId !== item.id) {
      onSelect(item.id)
      setSelectedItemId(item.id)
    }
  }

  const getButtonDisplay = (item, style) => {
    if (item.image) {
      return (
        <View
          style={[
            style.image,
            {
              backgroundImage: `url(${item.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }
          ]}
        />
      )
    } else {
      return (
        <Text style={style.label}>
          {item.label}
        </Text>
      )
    }
  }

  return (
    <View style={style}>
      {buttonData.map((item) => {
        const buttonStyle = item.id === selectedItemId ? buttonStyles.selected : buttonStyles.unselected
        return (
          <Pressable
            key={item.id}
            onPress={() => selectHandler(item)}
            style={buttonStyle}
          >
            {getButtonDisplay(item, buttonStyle)}
          </Pressable>
        )
      })}
    </View>
  )
}

RadioButtons.None = '_NO_SELECTION_'
