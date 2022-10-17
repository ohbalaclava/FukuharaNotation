import React from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import NoteSelectView from './NoteSelectView'
import StrokeSelectView from './StrokeSelectView'

ScoreMarksView.propTypes = {
  addNote: PropTypes.func.isRequired,
  addAccidental: PropTypes.func.isRequired,
  addUnit: PropTypes.func.isRequired,
  addDecoration: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function ScoreMarksView ({ addNote, addAccidental, addUnit, addDecoration, refresh }) {
  return (
    <View style={styles.input.marks}>
      <NoteSelectView addNote={addNote} addAccidental={addAccidental} refresh={refresh}/>
      <StrokeSelectView addUnit={addUnit} refresh={refresh}/>
    </View>
  )
}
