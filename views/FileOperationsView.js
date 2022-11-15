import React, { useContext, useState } from 'react'
import { View } from 'react-native-web'
import { useSpring, animated, config } from 'react-spring'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import styles from '../styles/ScreenStyles'
import { OperationButtons } from '../data/ButtonDefinitions'
import { DimensionsContext } from '../data/Dimensions'
import ConfirmClearDialog from '../components/ConfirmClearDialog'

FileOperationsView.propTypes = {
  download: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  toPDF: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired
}

const AnimatedView = animated(View)

export default function FileOperationsView ({ download, upload, toPDF, clear }) {
  const { dimensions } = useContext(DimensionsContext)
  const [visible, setVisible] = useState(false)
  const style = styles.input.operations

  const { transform, opacity } = useSpring({
    opacity: visible ? 1 : 0,
    transform: `perspective(600px) rotateX(${visible ? 90 : 0}deg)`,
    config: config.default
  })

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
        style={[style[OperationButtons.menu.style], dimensions.getSquareOperationButtonStyle()]}
      />

      <AnimatedView style={Object.assign({}, style.fileOps, { opacity, transform, rotateX: '-90deg' })}>
        <ImageButton
          image={OperationButtons.download.glyph}
          onPress={getRunAndCloseFunc(download)}
          style={[style[OperationButtons.download.style], dimensions.getSquareOperationButtonStyle()]}
        />
        <ConfirmClearDialog onYes={getRunAndCloseFunc(upload)} onNo={toggleMenu}>
          <ImageButton
            image={OperationButtons.upload.glyph}
            style={[style[OperationButtons.upload.style], dimensions.getSquareOperationButtonStyle()]}
          />
        </ConfirmClearDialog>
        <ImageButton
          image={OperationButtons.pdf.glyph}
          onPress={getRunAndCloseFunc(toPDF)}
          style={[style[OperationButtons.pdf.style], dimensions.getSquareOperationButtonStyle()]}
        />
        <ConfirmClearDialog onYes={getRunAndCloseFunc(clear)} onNo={toggleMenu}>
          <ImageButton
            image={OperationButtons.clear.glyph}
            style={[style[OperationButtons.clear.style], dimensions.getSquareOperationButtonStyle()]}
          />
        </ConfirmClearDialog>
      </AnimatedView>
    </View>
  )
}
