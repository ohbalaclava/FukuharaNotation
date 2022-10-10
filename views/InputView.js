import React, { useState } from 'react'
import { Button, Modal, Text, TextInput, View } from 'react-native-web'
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
  const [titleDialogVisible, setTitleDialogVisible] = useState(false)

  const border = {
    colour: 'grey',
    radius: 5,
    width: 1
  }

  function download () {
    if (score.getTitle().length === 0) {
      setTitleDialogVisible(true)
    } else {
      const scoreJson = score.serialise()
      const blob = new Blob([scoreJson])
      const downloadUrl = URL.createObjectURL(blob)

      const downloadLink = document.createElement('a')
      downloadLink.href = downloadUrl
      downloadLink.download = `${score.getTitle()}.shinobue.json`
      downloadLink.click()
      URL.revokeObjectURL(downloadUrl)
    }
  }

  return (
    <View style={styles.input.view}>
      <Background border={border} source={require('../assets/bamboo.png')}/>
      <NoteSelectView addNote={score.addNote} refresh={refresh}/>
      <AccidentalSelectView addAccidental={score.addAccidental} refresh={refresh}/>
      <OperationsView deleteMark={score.deleteMark} newline={score.newLine} refresh={refresh} download={download}/>

      <Modal onRequestClose={() => setTitleDialogVisible(false)} visible={titleDialogVisible} transparent animationType="fade">
        <View style={styles.titleDialog.view}>
          <Text style={styles.titleDialog.label}>Title:</Text>
          <TextInput onChange={(event) => score.setTitle(event.target.value)} style={styles.titleDialog.input}/>
          <Button onPress={() => { setTitleDialogVisible(false); download() }} title={'Download'} style={styles.titleDialog.button}/>
          <Button onPress={() => setTitleDialogVisible(false)} title={'Cancel'} style={styles.titleDialog.button}/>
        </View>
      </Modal>
    </View>
  )
}
