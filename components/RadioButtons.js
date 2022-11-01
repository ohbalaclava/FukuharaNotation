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
  styles: PropTypes.shape({
    selected: PropTypes.object,
    unselected: PropTypes.object
  })
}

export default function RadioButtons ({ buttonData, onSelect, styles }) {
  const [selectedItemId, setSelectedItemId] = useState(null)

  const selectHandler = (item) => {
    onSelect(item)
    setSelectedItemId(item.id)
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
    <View>
      {buttonData.map((item) => {
        const style = item.id === selectedItemId ? styles.selected : styles.unselected
        return (
          <Pressable
            key={item.id}
            onPress={selectHandler(item)}
            style={style}
          >
            {getButtonDisplay(item, style)}
          </Pressable>
        )
      })}
    </View>
  )
}
