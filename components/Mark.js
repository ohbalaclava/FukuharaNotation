import React, { useContext } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { DimensionsContext } from '../data/Dimensions'
import { getGlyph } from '../data/ScoreLiterals'
import Accidental from './Accidental'
import Decorations from './Decorations'
import styles from '../styles/ScreenStyles'

Mark.propTypes = {
  mark: PropTypes.shape({
    name: PropTypes.string.isRequired,
    accidental: PropTypes.object,
    decorations: PropTypes.instanceOf(Map)
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default function Mark ({ mark, onPress }) {
  const { dimensions } = useContext(DimensionsContext)
  const glyph = getGlyph(mark.name)

  return (
    <View>
      <Accidental accidental={mark.accidental}/>
      <Decorations decorations={mark.decorations} hasAccidental={mark.accidental !== undefined}/>
      <ImageButton
        image={glyph.source}
        onPress={() => onPress()}
        style={[styles.score.mark, dimensions.getNoteMarkStyle(glyph.relativeHeight)]}
      />
    </View>
  )
}
