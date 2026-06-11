import m from 'mithril'

import Mark from './Mark'
import { dims } from '../data/dimensionsStore'
import { toCSS } from '../styles/StyleUtils'
import Cursor from './Cursor'

// The marks list is keyed by mark.id; the pads and cursor stay outside the
// keyed fragment (mithril requires keyed children to be exclusively keyed).

export default {
  view ({ attrs }) {
    const { line, onPressMark, cursorIndex, markLengths } = attrs
    const defaultButtonSize = toCSS({
      width: dims.getLineWidth(),
      height: dims.getLineEndButtonHeight(),
      marginRight: dims.getLineSeparation()
    })

    return m('div.v.line-box', [
      m('div.v.line-pad-top', { style: defaultButtonSize, onclick: () => onPressMark(0) }),
      m('div.v.score-line', { style: { paddingRight: `${dims.getLinePaddingRight()}px` } },
        line.map((item, index) => m(Mark, {
          key: item.id,
          mark: item,
          onPress: () => onPressMark(index + 1)
        }))
      ),
      m('div.v.line-pad-bottom', { style: defaultButtonSize, onclick: () => onPressMark() }),
      (cursorIndex >= 0) ? m(Cursor, { markLengths }) : null
    ])
  }
}
