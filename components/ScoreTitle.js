import React, { useContext, useState } from 'react'
import { Button, Modal, Text, TextInput, View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { DimensionsContext } from '../data/Dimensions'

ScoreTitle.propTypes = {
  title: PropTypes.string,
  onOK: PropTypes.func,
  onCancel: PropTypes.func
}

export default function ScoreTitle ({ title, onOK, onCancel }) {
  const [titleDialogVisible, setTitleDialogVisible] = useState(false)
  const [_title, setTitle] = useState(() => title)
  const { dimensions } = useContext(DimensionsContext)

  return (
    <View>
      <Text style={[styles.title, dimensions.getTitleStyle()]} onPress={() => setTitleDialogVisible(true)}>
        {_title}
      </Text>

      <Modal onRequestClose={() => setTitleDialogVisible(false)} visible={titleDialogVisible} animationType="fade">
        <View style={styles.titleDialog.view}>
          <View style={styles.titleDialog.textComponents}>
            <Text style={styles.titleDialog.label}>Title of this piece</Text>
            <TextInput
              defaultValue={_title}
              onChange={(event) => setTitle(event.target.value)}
              selectTextOnFocus
              selectionColor='cadetblue'
              style={styles.titleDialog.input}
            />
          </View>
          <View style={styles.titleDialog.buttonComponents}>
            <Button onPress={() => { setTitleDialogVisible(false); onOK(_title) }} title={'OK'} color='cadetblue'/>
            <Button onPress={() => setTitleDialogVisible(false)} title={'Cancel'} color='cadetblue'/>
          </View>
        </View>
      </Modal>
    </View>
  )
}
