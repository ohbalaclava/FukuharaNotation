import React, { useContext } from 'react'
import { FlatList, View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { ScoreMarks } from '../data/ScoreLiterals'
import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import Config from '../data/Config'

DecorationSelectView.propTypes = {
  addDecoration: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function DecorationSelectView ({ addDecoration, refresh }) {
  const { dimensions } = useContext(DimensionsContext)
  const style = styles.input.marks.sections.decorations

  const renderDecorationButton = ({ item }) => {
    return (
      <ImageButton
        highlightColour={Config.inputButtonHighlightColour}
        image={item.glyph.source}
        onPress={() => { addDecoration(item); refresh() }}
        style={[style.button, dimensions.getDecorationButtonStyle()]}
      />
    )
  }

  return (
    <View style={ [style, dimensions.getDecorationButtonViewStyle()] }>
      <FlatList
        data={ScoreMarks.decorations}
        renderItem={renderDecorationButton}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
