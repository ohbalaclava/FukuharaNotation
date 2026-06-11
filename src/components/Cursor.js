import m from 'mithril'

import cursorPng from '../assets/cursor.png'
import { dims } from '../data/dimensionsStore'
import { toCSS } from '../styles/StyleUtils'

// Blinking handled by the CSS cursor-blink animation (was a 400ms setInterval).

export default {
  view ({ attrs }) {
    const cursorStyle = dims.getCursorStyle(attrs.markLengths)

    return m('div.v.score-cursor', { style: toCSS(cursorStyle) },
      m('img', {
        src: cursorPng,
        style: toCSS(cursorStyle.image)
      })
    )
  }
}
