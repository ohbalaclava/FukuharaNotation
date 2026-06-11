import m from 'mithril'

import Modal from './Modal'

// Shows the spinner for 1s while workFunc runs. The setTimeout fires outside
// mithril's event-handler auto-redraw, hence the explicit m.redraw().

export default function BusyDialog () {
  let dialogVisible = false

  return {
    view ({ attrs }) {
      const start = () => {
        dialogVisible = true
        setTimeout(() => {
          attrs.workFunc()
          dialogVisible = false
          m.redraw()
        }, 1000)
      }

      return m('div.v', [
        attrs.trigger(start),
        m(Modal, { visible: dialogVisible },
          m('div.v.dialog-view', [
            m('span.dialog-message', attrs.message),
            m('div.scale-loader', [m('span'), m('span'), m('span'), m('span'), m('span')])
          ])
        )
      ])
    }
  }
}
