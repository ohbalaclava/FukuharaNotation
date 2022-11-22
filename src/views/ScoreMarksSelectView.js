import React from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import NoteSelectView from './NoteSelectView'
import StrokeSelectView from './StrokeSelectView'

ScoreMarksSelectView.propTypes = {
  addNote: PropTypes.func.isRequired,
  addAccidental: PropTypes.func.isRequired,
  addStroke: PropTypes.func.isRequired,
  addDecoration: PropTypes.func.isRequired,
  setJoin: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function ScoreMarksSelectView ({ addNote, addAccidental, addStroke, addDecoration, setJoin, refresh }) {
  return (
    <View style={styles.input.marks}>
      <View style={styles.input.marks.sections}>
        <NoteSelectView addNote={addNote} addAccidental={addAccidental} refresh={refresh}/>
        <StrokeSelectView addStroke={addStroke} addDecoration={addDecoration} setJoin={setJoin} refresh={refresh}/>
      </View>
    </View>
  )
}
