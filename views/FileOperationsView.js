import React, { useContext, useState } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import styles from '../styles/ScreenStyles'
import { OperationButtons } from '../data/ButtonDefinitions'
import { DimensionsContext } from '../data/Dimensions'

FileOperationsView.propTypes = {
  download: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  toPDF: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
}

export default function FileOperationsView ({ download, upload, toPDF, clear }) {
  const { dimensions } = useContext(DimensionsContext)
  const [visible, setVisible] = useState(false)
  const style = styles.input.operations

  function toggleMenu () {
    setVisible(!visible)
  }

  function getRunAndCloseFunc (buttonFunc) {
    return () => {
      buttonFunc()
      toggleMenu()
    }
  }

  return (
    <View>
      <ImageButton
        image={OperationButtons.menu.glyph}
        onPress={toggleMenu}
        buttonStyleName={OperationButtons.menu.style}
        style={[style[OperationButtons.menu.style], dimensions.getSquareOperationButtonStyle({ small: true })]}
      />

      <View style={[style.fileOps, { display: (visible) ? 'flex' : 'none' }]}>
        <ImageButton
          image={OperationButtons.download.glyph}
          onPress={getRunAndCloseFunc(download)}
          style={[style[OperationButtons.download.style], dimensions.getSquareOperationButtonStyle()]}
        />
        <ImageButton
          image={OperationButtons.upload.glyph}
          onPress={getRunAndCloseFunc(upload)}
          style={[style[OperationButtons.upload.style], dimensions.getSquareOperationButtonStyle()]}
        />
        <ImageButton
          image={OperationButtons.pdf.glyph}
          onPress={getRunAndCloseFunc(toPDF)}
          style={[style[OperationButtons.pdf.style], dimensions.getSquareOperationButtonStyle()]}
        />
        <ImageButton
          image={OperationButtons.clear.glyph}
          onPress={getRunAndCloseFunc(clear)}
          style={[style[OperationButtons.clear.style], dimensions.getSquareOperationButtonStyle()]}
        />
      </View>
    </View>
  )
}
