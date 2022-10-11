import React from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import styles from '../styles/ScreenStyles'
import { Operations } from '../data/Operations'

OperationsView.propTypes = {
  deleteMark: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  newline: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired
}

export default function OperationsView ({ deleteMark, newline, download, upload, refresh }) {
  return (
    <View style={ styles.operations.view }>
      <View style={ styles.operations.view.row1 }>
        <ImageButton
          image={Operations.delete.glyph}
          onPress={() => { deleteMark(); refresh() }}
          buttonStyleName={Operations.delete.style}
          styleGroup='operations'
        />
        <ImageButton
          image={Operations.newline.glyph}
          onPress={() => { newline(); refresh() }}
          buttonStyleName={Operations.newline.style}
          styleGroup='operations'
        />
      </View>
      <View style={ styles.operations.view.row2 }>
        <ImageButton
          image={Operations.download.glyph}
          onPress={() => { download() }}
          buttonStyleName={Operations.download.style}
          styleGroup='operations'
        />
        <ImageButton
          image={Operations.upload.glyph}
          onPress={() => { upload() }}
          buttonStyleName={Operations.upload.style}
          styleGroup='operations'
        />
      </View>
    </View>
  )
}
