import m from 'mithril'
import Dimensions from './Dimensions'

// Module-scope singleton replacing React's DimensionsContext +
// useWindowDimensions. Dimensions() recomputes all derived geometry via
// setWindowDimensions, so a resize just feeds in the new size and redraws.

export const dims = Dimensions({ width: window.innerWidth, height: window.innerHeight })

window.addEventListener('resize', () => {
  dims.setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
  m.redraw()
})
