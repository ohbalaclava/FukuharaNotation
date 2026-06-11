import m from 'mithril'

import { createEmptyScore } from '../model/Score'
import ScoreView from '../views/ScoreView'
import InputView from '../views/InputView'
import { dims } from '../data/dimensionsStore'
import { toCSS } from '../styles/StyleUtils'

export default function HomeScreen () {
  let score = createEmptyScore()

  // Unconditional redraw covers async callers (the upload FileReader.onload);
  // synchronous event-handler callers just redraw a second time, harmlessly.
  const refresh = (newScore) => {
    if (newScore) {
      score = newScore
    }
    m.redraw()
  }

  return {
    view () {
      return m('div.v.app-root',
        m('div.v.main-view', { style: toCSS(dims.getWindowStyle()) }, [
          m(ScoreView, { score, refresh }),
          m(InputView, { score, refresh })
        ])
      )
    }
  }
}
