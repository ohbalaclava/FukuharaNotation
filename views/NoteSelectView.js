import React, { useContext } from 'react'
import { FlatList, View } from 'react-native-web'
import PropTypes from 'prop-types'

import ImageButton from '../components/ImageButton'
import { ScoreMarks } from '../data/ScoreLiterals'
import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import AccidentalSelectView from './AccidentalSelectView'
import Config from '../data/Config'

NoteSelectView.propTypes = {
  addNote: PropTypes.func.isRequired,
  addAccidental: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function NoteSelectView ({ addNote, addAccidental, refresh }) {
  const { dimensions } = useContext(DimensionsContext)

  const renderNoteButton = ({ item }) => {
    return (
      <ImageButton
        highlightColour={Config.inputButtonHighlightColour}
        image={item.glyph.source}
        onPress={() => { addNote(item); refresh() }}
        buttonStyleName='noteButton'
        styleGroup='notes'
        otherStyle={dimensions.getNoteButtonStyle()}
      />
    )
  }

  return (
    <View style={[styles.notes.view, { height: dimensions.getNoteButtonViewHeight() }]}>
      <FlatList
        numColumns='1'
        data={ScoreMarks.notes.ryo}
        renderItem={renderNoteButton}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.notes.buttons}
      />
      <FlatList
        numColumns='1'
        data={ScoreMarks.notes.kan}
        renderItem={renderNoteButton}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.notes.buttons}
      />
      <FlatList
        numColumns='1'
        data={ScoreMarks.notes.daikan}
        renderItem={renderNoteButton}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.notes.buttons}
      />
      <AccidentalSelectView addAccidental={addAccidental} refresh={refresh}/>
    </View>
  )
}
