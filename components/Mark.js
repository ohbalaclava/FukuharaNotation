import React, { useContext } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { DimensionsContext } from '../data/Dimensions'
import { getGlyph } from '../data/ScoreLiterals'
import Accidental from './Accidental'
import Decorations from './Decorations'

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
      <Decorations decorations={mark.decorations}/>
      <ImageButton
        image={glyph.source}
        onPress={() => onPress()}
        buttonStyleName='mark'
        styleGroup='score'
        otherStyle={dimensions.getNoteMarkStyle(glyph.relativeHeight)}
      />
    </View>
  )
}
