import React, { useContext } from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import { ScoreMarks } from '../data/ScoreLiterals'
import { DimensionsContext } from '../data/Dimensions'
import ImageButton from '../components/ImageButton'
import Config from '../data/Config'
import GridView from './GridView'
import styles from '../styles/ScreenStyles'
import DecorationSelectView from './DecorationSelectView'

StrokeSelectView.propTypes = {
  addStroke: PropTypes.func.isRequired,
  addDecoration: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function StrokeSelectView ({ addStroke, addDecoration, refresh }) {
  const { dimensions } = useContext(DimensionsContext)
  const style = styles.input.marks.sections.strokes

  const renderStrokeButton = ({ item }) => {
    return (
      <ImageButton
        key={item.name}
        highlightColour={Config.inputButtonHighlightColour}
        image={item.glyph.source}
        onPress={() => { addStroke(item); refresh() }}
        style={[style.button, dimensions.getStrokeButtonStyle(item.glyph.relativeHeight)]}
      />
    )
  }

  return (
    <View style={style}>
      <GridView
        items={ScoreMarks.strokes}
        renderItem={renderStrokeButton}
        noRows={4}
      />
      <DecorationSelectView addDecoration={addDecoration} refresh={refresh}/>
    </View>
  )
}
