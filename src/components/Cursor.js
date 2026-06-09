import React, { useContext, useEffect, useState } from 'react'
import { Image, View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'

const Glyph = new URL('../assets/cursor.png', import.meta.url).href

Cursor.propTypes = {
  markLengths: PropTypes.number.isRequired
}

export default function Cursor ({ markLengths }) {
  const [showCursor, setShowCursor] = useState(true)
  const { dimensions } = useContext(DimensionsContext)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((showCursor) => !showCursor)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  const cursorDimensionsStyle = dimensions.getCursorStyle(markLengths)

  return (
    <View style={[styles.score.cursor, cursorDimensionsStyle]}>
      <Image
        style={[
          styles.score.cursor.image,
          cursorDimensionsStyle.image,
          { visibility: showCursor ? 'visible' : 'hidden' }
        ]}
        source={Glyph}
      />
    </View>
  )
}
