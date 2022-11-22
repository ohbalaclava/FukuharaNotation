import React, { useContext, useState } from 'react'
import { Button, Modal, Text, TextInput, View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'
import Config from '../data/Config'

ScoreTitle.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  notes: PropTypes.string,
  onOK: PropTypes.func,
  onCancel: PropTypes.func
}

export default function ScoreTitle ({ title, author, notes, onOK, onCancel }) {
  const [titleDialogVisible, setTitleDialogVisible] = useState(false)
  const [_title, setTitle] = useState(() => title)
  const [_author, setAuthor] = useState(() => author)
  const [_notes, setNotes] = useState(() => notes)
  const [updatedTitle, setUpdatedTitle] = useState(() => title)
  const [updatedAuthor, setUpdatedAuthor] = useState(() => author)
  const [updatedNotes, setUpdatedNotes] = useState(() => notes)
  const { dimensions } = useContext(DimensionsContext)

  function openDialog () {
    setTitleDialogVisible(true)
  }

  function closeDialog (commit) {
    setTitleDialogVisible(false)
    if (commit) {
      setTitle(updatedTitle)
      setAuthor(updatedAuthor)
      setNotes(updatedNotes)
      onOK && onOK(updatedTitle, updatedAuthor, updatedNotes)
    } else {
      setUpdatedTitle(_title)
      setUpdatedAuthor(_author)
      setUpdatedNotes(_notes)
      onCancel && onCancel()
    }
  }

  function trim (text) {
    return (text.length > 24) ? `${text.substring(0, 21)}...` : text
  }

  function replaceLineBreaks (text) {
    return text.replaceAll('\n', '  ')
  }

  return (
    <View>
      <Text style={[styles.input.title, dimensions.getTitleStyle()]} onPress={() => openDialog()}>
        {trim(_title)}
      </Text>

      <Modal onRequestClose={closeDialog} visible={titleDialogVisible} animationType="fade">
        <View style={styles.titleDialog.view}>
          <View style={styles.titleDialog.textComponents}>
            <Text style={styles.titleDialog.label}>Title</Text>
            <TextInput
              defaultValue={_title}
              onChange={(event) => setUpdatedTitle(event.target.value)}
              selectTextOnFocus
              selectionColor='cadetblue'
              style={styles.titleDialog.titleInput}
            />
            <Text style={styles.titleDialog.label}>Author</Text>
            <TextInput
              defaultValue={_author}
              onChange={(event) => setUpdatedAuthor(event.target.value)}
              selectTextOnFocus
              selectionColor='cadetblue'
              style={styles.titleDialog.authorInput}
            />
            <Text style={styles.titleDialog.label}>Notes</Text>
            <TextInput
              defaultValue={_notes}
              onChange={(event) => {
                setUpdatedNotes(replaceLineBreaks(event.target.value))
              }}
              multiline
              numberOfLines={5}
              selectionColor='cadetblue'
              style={styles.titleDialog.notesInput}
              maxLength={Config.maxNotesLength}
            />
          </View>
          <View style={styles.titleDialog.buttonComponents}>
            <Button onPress={() => { closeDialog(true) }} title={'OK'} color='cadetblue'/>
            <Button onPress={() => { closeDialog() }} title={'Cancel'} color='cadetblue'/>
          </View>
        </View>
      </Modal>
    </View>
  )
}
