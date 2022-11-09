import React, { useContext } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { DimensionsContext } from '../data/Dimensions'
import { getGlyph } from '../data/ScoreLiterals'
import Accidental from './Accidental'
import Decorations from './Decorations'
import styles from '../styles/ScreenStyles'
import Join from './Join'

Mark.propTypes = {
  mark: PropTypes.shape({
    name: PropTypes.string.isRequired,
    accidental: PropTypes.object,
    decorations: PropTypes.instanceOf(Map),
    join: PropTypes.string
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
      <Join join={mark.join}/>
      <ImageButton
        image={glyph.source}
        onPress={() => onPress()}
        style={[styles.score.mark, dimensions.getNoteMarkStyle(glyph.relativeHeight)]}
      />
    </View>
  )
}
