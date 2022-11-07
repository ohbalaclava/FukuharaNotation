import React, { useContext } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import styles from '../styles/ScreenStyles'
import { OperationButtons } from '../data/ButtonDefinitions'
import { DimensionsContext } from '../data/Dimensions'

FileOperationsView.propTypes = {
  download: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  toPDF: PropTypes.func.isRequired
}

export default function FileOperationsView ({ download, upload, toPDF }) {
  const { dimensions } = useContext(DimensionsContext)
  const style = styles.input.operations

  return (
    <View style={ style }>
      <View style={ style.fileOps }>
        <ImageButton
          image={OperationButtons.download.glyph}
          onPress={() => { download() }}
          style={[style[OperationButtons.download.style], dimensions.getSquareOperationButtonStyle()]}
        />
        <ImageButton
          image={OperationButtons.upload.glyph}
          onPress={() => { upload() }}
          style={[style[OperationButtons.upload.style], dimensions.getSquareOperationButtonStyle()]}
        />
        <ImageButton
          image={OperationButtons.pdf.glyph}
          onPress={() => { toPDF() }}
          style={[style[OperationButtons.pdf.style], dimensions.getSquareOperationButtonStyle()]}
        />
      </View>
    </View>
  )
}
