import React, { useContext } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import { getGlyph } from '../data/ScoreLiterals'

Decorations.propTypes = {
  decorations: PropTypes.instanceOf(Map),
  hasAccidental: PropTypes.bool
}

export default function Decorations ({ decorations, hasAccidental }) {
  const { dimensions } = useContext(DimensionsContext)

  const getDecorationsArray = () => {
    const result = []
    decorations && decorations.forEach((decoration) => {
      result.push(
        <View
          key={decoration.name}
          style={[
            styles.score.decoration,
            dimensions.getDecorationMarkStyle(decoration.name, hasAccidental),
            {
              backgroundImage: `url(${getGlyph(decoration.name).source})`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }
          ]}
        />
      )
    })

    return result
  }

  return (
    <View style={styles.score.decorations}>
      {getDecorationsArray()}
    </View>
  )
}
