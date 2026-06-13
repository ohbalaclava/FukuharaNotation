import m from 'mithril'

import Line from '../components/Line'
import { dims } from '../data/dimensionsStore'

// score.onEdit fires synchronously mid-mutation, before the redraw, so the
// handler only sets a flag; the actual scroll happens in onupdate once the
// new line exists in the DOM. The hook is re-registered every view so an
// uploaded (replacement) score gets it too.

export default function ScoreView () {
  let scrollPending = false

  function scrollToCurrentLine (vnode) {
    const score = vnode.attrs.score
    const content = vnode.dom.querySelector('.score-lines-content')
    const lineElement = content && content.children[score.getCurrentLineIndex()]
    lineElement && lineElement.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  return {
    view ({ attrs }) {
      const { score } = attrs
      score.onEdit(() => { scrollPending = true })

      const lineWidth = dims.getLineFullWidth()

      return m('div.v.score',
        m('div.v.score-lines',
          // The original inverted FlatList flipped the container with
          // scaleX(-1), so its paddingRight rendered visually on the left;
          // with row-reverse there is no flip, so the extra space at the
          // scrolled-away end is paddingLeft here.
          m('div.v.score-lines-content', { style: { paddingLeft: `${lineWidth * 1.5}px` } },
            score.getLines().map((item, index) => {
              const isCurrentLine = index === score.getCurrentLineIndex()
              return m(Line, {
                key: item.id,
                line: item.marks,
                onPressMark: (markIndex) => score.goto(index, markIndex),
                cursorIndex: isCurrentLine ? score.getCurrentMarkIndex() : -1,
                markLengths: isCurrentLine ? score.getCurrentMarkIndexInLengths() : -1
              })
            })
          )
        )
      )
    },
    onupdate (vnode) {
      if (scrollPending) {
        scrollPending = false
        scrollToCurrentLine(vnode)
      }
    }
  }
}
