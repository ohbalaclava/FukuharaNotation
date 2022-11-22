import React from 'react'
import PropTypes from 'prop-types'

import TwoOptionDialog from './TwoOptionDialog'
import { View } from 'react-native-web'

ConfirmClearDialog.propTypes = {
  isConfirmationRequired: PropTypes.func,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export default function ConfirmClearDialog ({ isConfirmationRequired, onYes, onNo, children }) {
  if (isConfirmationRequired()) {
    return (
      <TwoOptionDialog
        message={'The current score will be cleared. Do you wish to continue?'}
        optionOneLabel={'Yes'}
        optionTwoLabel={'No'}
        onOptionOne={onYes}
        onOptionTwo={onNo}
      >
        {children}
      </TwoOptionDialog>
    )
  } else {
    return (
      <View>
        {children}
      </View>
    )
  }
}
