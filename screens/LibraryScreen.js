import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import styles from '../styles/ScreenStyles'

function LibraryScreen ({ navigation }) {
  return (
    <View style={styles}>
      <Text>Donko don</Text>
    </View>
  )
}

LibraryScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default LibraryScreen
