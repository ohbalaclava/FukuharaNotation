import React from 'react'
import { FlatList, View } from 'react-native'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { ScoreMarks } from '../data/ScoreLiterals'
import styles from '../styles/ScreenStyles'

AccidentalSelectView.propTypes = {
  addAccidental: PropTypes.func.isRequired,
  setDirty: PropTypes.func.isRequired
}

export default function AccidentalSelectView (props) {
  const renderAccidentalButton = ({ item }) => {
    return (
      <ImageButton
        image={item.glyph.white}
        onPress={() => { props.addAccidental(item); props.setDirty() }}
        buttonStyleName='accidentalButton'
        styleGroup='accidentals'
      />
    )
  }

  return (
    <View style={ styles.accidentals.view }>
      <FlatList
        horizontal={true}
        data={ScoreMarks.accidentals}
        renderItem={renderAccidentalButton}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
