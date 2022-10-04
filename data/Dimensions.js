import { assert } from '../tools/Assertions'
import Config from './Config'
import { createContext } from 'react'

export const scoreContentPadding = 20
export const scoreLineMarginRight = 25
export const scoreLinePaddingRight = 0

export default function Dimensions (window) {
  let contentHeight
  let noteMark
  let lineWidth
  let lineFullWidth
  let lineSeparation
  let markHeight
  let lineEndButtonHeight
  let cursor
  let scoreScrollOffset = 0

  setWindowDimensions(window)

  function updateScoreContentHeight () {
    contentHeight = window.height - scoreContentPadding * 2
  }

  function updateNoteMarkDimensions () {
    const padding = 2
    const totalMarkLength = contentHeight / Config.maxLineLength
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
    lineSeparation = scoreLineMarginRight + scoreLinePaddingRight
    lineWidth = 2 * (noteMark.marginHorizontal + noteMark.padding) + noteMark.image.width
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

  function setScoreScrollOffset (offset) {
    scoreScrollOffset = offset
    updateCursorDimensions()
  }

  function getWindowStyle () {
    return window
  }

  function getNoteMarkStyle () {
    return noteMark
  }

  function getCursorStyle (mark) {
    return {
      ...cursor,
      top: mark * markHeight + lineEndButtonHeight
    }
  }

  function getLineWidth () {
    return lineWidth
  }

  function getLineFullWidth () {
    return lineFullWidth
  }

  function getLineSeparation () {
    return lineSeparation
  }

  function getMarkHeight () {
    return markHeight
  }

  function getLineEndButtonHeight () {
    return lineEndButtonHeight
  }

  return {
    getCursorStyle,
    getLineWidth,
    getLineFullWidth,
    getLineSeparation,
    getMarkHeight,
    getLineEndButtonHeight,
    getNoteMarkStyle,
    getWindowStyle,
    setScoreScrollOffset,
    setWindowDimensions
  }
}

export const DimensionsContext = createContext()
