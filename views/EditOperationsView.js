import React, { useContext } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import styles from '../styles/ScreenStyles'
import { OperationButtons } from '../data/ButtonDefinitions'
import { DimensionsContext } from '../data/Dimensions'
import FileOperationsView from './FileOperationsView'

EditOperationsView.propTypes = {
  deleteMark: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  newline: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  toPDF: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
}

export default function EditOperationsView ({ deleteMark, newline, download, upload, toPDF, clear, refresh }) {
  const { dimensions } = useContext(DimensionsContext)
  const style = styles.input.operations

  return (
    <View style={ style }>
      <View style={ style.editOps }>
        <ImageButton
          image={OperationButtons.delete.glyph}
          onPress={() => { deleteMark(); refresh() }}
          style={[style[OperationButtons.delete.style], dimensions.getWideOperationButtonStyle()]}
        />
        <ImageButton
          image={OperationButtons.newline.glyph}
          onPress={() => { newline(); refresh() }}
          buttonStyleName={OperationButtons.newline.style}
          style={[style[OperationButtons.newline.style], dimensions.getSquareOperationButtonStyle()]}
        />
        <FileOperationsView download={download} upload={upload} toPDF={toPDF} clear={clear}/>
      </View>
    </View>
  )
}
