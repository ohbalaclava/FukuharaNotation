import m from 'mithril'

import TwoOptionDialog from './TwoOptionDialog'

// When confirmation is not required the trigger runs onYes directly,
// matching the old behaviour where the wrapped button kept its own onPress.

export default {
  view ({ attrs }) {
    if (attrs.isConfirmationRequired()) {
      return m(TwoOptionDialog, {
        message: 'The current score will be cleared. Do you wish to continue?',
        optionOneLabel: 'Yes',
        optionTwoLabel: 'No',
        onOptionOne: attrs.onYes,
        onOptionTwo: attrs.onNo,
        trigger: attrs.trigger
      })
    }
    return m('div.v', attrs.trigger(attrs.onYes))
  }
}
