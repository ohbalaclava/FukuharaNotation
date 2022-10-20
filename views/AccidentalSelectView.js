import React, { useContext } from 'react'
import { FlatList, View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { ScoreMarks } from '../data/ScoreLiterals'
import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'

AccidentalSelectView.propTypes = {
  addAccidental: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function AccidentalSelectView ({ addAccidental, refresh }) {
  const { dimensions } = useContext(DimensionsContext)

  const renderAccidentalButton = ({ item }) => {
    return (
      <ImageButton
        image={item.glyph.source}
        onPress={() => { addAccidental(item); refresh() }}
        buttonStyleName='accidentalButton'
        styleGroup='accidentals'
        otherStyle={dimensions.getAccidentalButtonStyle()}
      />
    )
  }

  return (
    <View style={ [styles.accidentals.view, dimensions.getAccidentalButtonViewStyle()] }>
      <FlatList
        data={ScoreMarks.accidentals}
        renderItem={renderAccidentalButton}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
