import { assert } from '../tools/Assertions'
import Config from './Config'
import { createContext } from 'react'

export const scoreContentPadding = 20
export const scoreLineMarginRight = 5

export default function Dimensions (window) {
  let contentHeight
  let noteMark
  let lineWidth
  let lineFullWidth
  let lineSeparation
  let markHeight
  let lineEndButtonHeight
  let cursor
  let linePaddingRight

  setWindowDimensions(window)

  function updateScoreContentHeight () {
    contentHeight = window.height - scoreContentPadding * 2
  }

  function updateNoteMarkDimensions () {
    const padding = 2
    const totalMarkLength = contentHeight / (Config.maxLineLength + 1)
    const marginVertical = totalMarkLength / 10
    const marginHorizontal = totalMarkLength * 0.15
    const markImageLength = totalMarkLength - 2 * (padding + marginVertical)

    noteMark = {
      image: {
        width: markImageLength,
        height: markImageLength
      },
      padding,
      marginVertical,
      marginHorizontal
    }

    markHeight = 2 * (marginVertical + padding) + markImageLength
  }

  function updateLineDimensions () {
    lineWidth = 2 * (noteMark.marginHorizontal + noteMark.padding) + noteMark.image.width
    linePaddingRight = lineWidth
    lineSeparation = scoreLineMarginRight + linePaddingRight
    lineFullWidth = lineWidth + lineSeparation
    lineEndButtonHeight = noteMark.image.height / 2
  }

  function updateCursorDimensions () {
    cursor = {
      position: 'absolute',
      image: {
        width: noteMark.image.width,
        height: noteMark.image.width / 8
      },
      paddingLeft: noteMark.padding,
      paddingRight: noteMark.padding,
      marginHorizontal: noteMark.marginHorizontal
    }
  }

  function setWindowDimensions (windowDimensions) {
    assert(window, 'Dimensions: window must be a { width, height }')

    window = windowDimensions
    updateScoreContentHeight()
    updateNoteMarkDimensions()
    updateLineDimensions()
    updateCursorDimensions()
  }

  function getCursorStyle (mark) {
    return {
      ...cursor,
      top: mark * markHeight + lineEndButtonHeight
    }
  }

  return {
    getCursorStyle,
    getLineWidth: () => lineWidth,
    getLineFullWidth: () => lineFullWidth,
    getLinePaddingRight: () => linePaddingRight,
    getLineSeparation: () => lineSeparation,
    getMarkHeight: () => markHeight,
    getLineEndButtonHeight: () => lineEndButtonHeight,
    getNoteMarkStyle: () => noteMark,
    getWindowStyle: () => window,
    setWindowDimensions
  }
}

export const DimensionsContext = createContext()
