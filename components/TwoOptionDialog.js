import React, { useState } from 'react'
import { Button, Modal, Text, View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'

TwoOptionDialog.propTypes = {
  message: PropTypes.string,
  optionOneLabel: PropTypes.string,
  optionTwoLabel: PropTypes.string,
  onOptionOne: PropTypes.func,
  onOptionTwo: PropTypes.func,
  children: PropTypes.element.isRequired
}

export default function TwoOptionDialog ({ message, optionOneLabel, optionTwoLabel, onOptionOne, onOptionTwo, children }) {
  const [dialogVisible, setDialogVisible] = useState(false)

  function closeDialog () {
    setDialogVisible(false)
  }

  return (
    <View>
      {React.cloneElement(children, { onPress: () => setDialogVisible(true) })}

      <Modal onRequestClose={closeDialog} visible={dialogVisible} animationType="fade">
        <View style={styles.twoOptionDialog.view}>
          <Text style={styles.twoOptionDialog.message}>{message}</Text>
          <View style={styles.twoOptionDialog.buttons}>
            <Button onPress={() => { closeDialog(); onOptionOne && onOptionOne() }} title={optionOneLabel} color='cadetblue'/>
            <Button onPress={() => { closeDialog(); onOptionTwo && onOptionTwo() }} title={optionTwoLabel} color='cadetblue'/>
          </View>
        </View>
      </Modal>
    </View>
  )
}
