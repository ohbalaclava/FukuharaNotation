import React, { useContext } from 'react'
import { FlatList, View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { ScoreMarks } from '../data/ScoreLiterals'
import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import Config from '../data/Config'

AccidentalSelectView.propTypes = {
  addAccidental: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function AccidentalSelectView ({ addAccidental, refresh }) {
  const { dimensions } = useContext(DimensionsContext)
  const style = styles.input.marks.sections.accidentals

  const renderAccidentalButton = ({ item }) => {
    return (
      <ImageButton
        highlightColour={Config.inputButtonHighlightColour}
        image={item.glyph.source}
        onPress={() => { addAccidental(item); refresh() }}
        style={[style.button, dimensions.getAccidentalButtonStyle()]}
      />
    )
  }

  return (
    <View style={ [style, dimensions.getAccidentalButtonViewStyle()] }>
      <FlatList
        data={ScoreMarks.accidentals}
        renderItem={renderAccidentalButton}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
