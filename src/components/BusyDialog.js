import React, { useState } from 'react'
import { Modal, Text, View } from 'react-native-web'
import PropTypes from 'prop-types'

import styles from '../styles/ScreenStyles'
import { ScaleLoader } from 'react-spinners'

const override = {
  flex: 'initial'
}

BusyDialog.propTypes = {
  message: PropTypes.string,
  children: PropTypes.element.isRequired,
  workFunc: PropTypes.func.isRequired
}

export default function BusyDialog ({ message, children, workFunc }) {
  const [dialogVisible, setDialogVisible] = useState(false)

  function closeDialog () {
    setDialogVisible(false)
  }

  return (
    <View>
      { React.cloneElement(
          children,
          { onPress: () => {
            setDialogVisible(true)
            setTimeout(() => {
              workFunc()
              setDialogVisible(false)}, 1000)
            }
          }
        )
      }

      <Modal onRequestClose={closeDialog} visible={dialogVisible} animationType="fade">
        <View style={styles.busyDialog.view}>
          <Text style={styles.busyDialog.message}>{message}</Text>
          <View style={override}>
            <ScaleLoader color={'crimson'} loading={dialogVisible} height={60} width={6} radius={5}/>
          </View>
        </View>
      </Modal>
    </View>
  )
}
