import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import styles from '../styles/ScreenStyles'
import { Operations } from '../data/Operations'

OperationsView.propTypes = {
  delete: PropTypes.func.isRequired,
  setDirty: PropTypes.func.isRequired,
  newline: PropTypes.func.isRequired
}

export default function OperationsView (props) {
  return (
    <View style={ styles.operations.view }>
      <ImageButton
        image={Operations.delete.glyph}
        onPress={() => { props.delete(); props.setDirty() }}
        buttonStyleName={Operations.delete.style}
        styleGroup='operations'
      />
      <ImageButton
        image={Operations.newline.glyph}
        onPress={() => { props.newline(); props.setDirty() }}
        buttonStyleName={Operations.newline.style}
        styleGroup='operations'
      />
    </View>
  )
}
