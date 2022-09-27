import React from 'react'
import { FlatList, View } from 'react-native'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { ScoreMarks } from '../data/ScoreLiterals'
import styles from '../styles/ScreenStyles'

NoteSelectView.propTypes = {
  addNote: PropTypes.func.isRequired,
  setDirty: PropTypes.func.isRequired
}

export default function NoteSelectView (props) {
  const renderNoteButton = ({ item }) => {
    return (
      <ImageButton
        image={item.glyph.white}
        onPress={() => { props.addNote(item); props.setDirty() }}
        buttonStyleName='noteButton'
        styleGroup='notes'
      />
    )
  }

  return (
    <View style={ styles.notes.view }>
      <FlatList
        numColumns='1'
        data={ScoreMarks.notes.ryo}
        renderItem={renderNoteButton}
        keyExtractor={(item) => item.name}
      />
      <FlatList
        numColumns='1'
        data={ScoreMarks.notes.kan}
        renderItem={renderNoteButton}
        keyExtractor={(item) => item.name}
      />
      <FlatList
        numColumns='1'
        data={ScoreMarks.notes.daikan}
        renderItem={renderNoteButton}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}
