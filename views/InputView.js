import React from 'react'
import { View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import Background from '../components/Background'
import NoteSelectView from '../views/NoteSelectView'
import AccidentalSelectView from './AccidentalSelectView.js'
import OperationsView from './OperationsView.js'

InputView.propTypes = {
  score: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired
}

export default function InputView ({ score, refresh }) {
  const border = {
    colour: 'grey',
    radius: 5,
    width: 1
  }

  return (
    <View style={styles.input.view}>
      <Background border={border} source={require('../assets/bamboo.png')}/>
      <NoteSelectView addNote={score.addNote} refresh={refresh}/>
      <AccidentalSelectView addAccidental={score.addAccidental} refresh={refresh}/>
      <OperationsView delete={score.deleteMark} newline={score.newLine} refresh={refresh}/>
    </View>
  )
}
