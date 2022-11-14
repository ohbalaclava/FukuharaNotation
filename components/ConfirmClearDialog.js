import React from 'react'
import PropTypes from 'prop-types'

import TwoOptionDialog from './TwoOptionDialog'

ConfirmClearDialog.propTypes = {
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export default function ConfirmClearDialog ({ onYes, onNo, children }) {
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
}
