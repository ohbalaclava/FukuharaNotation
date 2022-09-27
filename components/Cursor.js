import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'

import styles from '../styles/ScreenStyles'

const Glyph = require('../assets/cursor.png')

const Cursor = () => {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((showText) => !showText)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  const buttonStyle = styles.score.cursor
  return (
    <TouchableOpacity style={[buttonStyle]}>
      <Image style={[buttonStyle.image, { display: showCursor ? 'none' : 'flex' }]} source={Glyph} />
    </TouchableOpacity>
  )
}

export default Cursor
