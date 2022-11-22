import Config from './Config'
import { createContext } from 'react'
import deepmerge from '../tools/DeepMerge'

export const scoreContentPadding = 20
export const scoreLineMarginRight = 5
export const inputPanelMargin = 20

const minimumInputPanelHeight = 400
const inputPanelAspectRatio = 0.2637
const wideButtonAspectRatio = 1.5

export default function Dimensions (window) {
  let inputPanelHeight
  let scoreMarksButtonPanelHeight
  let noteButtonPanelHeight
  let strokeButtonPanelHeight
  let titlePanelHeight
  let editOpsPanelHeight
  let octaveSelectorHeight

  let scoreContentHeight
  let noteMark
  let accidentalMark
  let decorationMark
  let lineWidth
  let lineFullWidth
  let lineSeparation
  let markHeight
  let lineEndButtonHeight
  let cursor
  let linePaddingRight

  let inputPanel
  let showHideButton
  let octaveSelectorButton
  let noteButton
  let strokeButton
  let joinButton
  let accidentalButton
  let decorationButton
  let squareOperationButton
  let wideOperationButton
  let title

  setWindowDimensions(window)

  function setWindowDimensions (windowDimensions) {
    window = windowDimensions
    updateInputPanelDimensions()
    updateScoreContentHeight()
    updateNoteMarkDimensions()
    updateAccidentalMarkDimensions()
    updateDecorationMarkDimensions()
    updateLineDimensions()
    updateCursorDimensions()
  }

  function updateScoreContentHeight () {
    scoreContentHeight = window.height - scoreContentPadding * 2
  }

  function updateNoteMarkDimensions () {
    markHeight = scoreContentHeight / (Config.maxLineLength + 1)

    noteMark = {
      image: {
        width: markHeight,
        height: markHeight
      }
    }
  }

  function updateAccidentalMarkDimensions () {
    const accidentalHeight = markHeight / 2

    accidentalMark = {
      width: accidentalHeight,
      height: accidentalHeight
    }
  }

  function updateDecorationMarkDimensions () {
    decorationMark = {}
    decorationMark.LeanTo = {
      top: 0,
      left: -noteMark.image.width * 0.25,
      width: markHeight * 1.75,
      height: markHeight
    }
    decorationMark.Dot = {
      top: 0,
      left: noteMark.image.width * 0.75,
      width: markHeight,
      height: markHeight
    }
  }

  function updateLineDimensions () {
    lineWidth = noteMark.image.width
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
      }
    }
  }

  function updateInputPanelDimensions () {
    inputPanelHeight = Math.max(window.height - inputPanelMargin * 2, minimumInputPanelHeight)
    titlePanelHeight = inputPanelHeight / 24
    editOpsPanelHeight = inputPanelHeight / 13
    scoreMarksButtonPanelHeight = inputPanelHeight - titlePanelHeight - editOpsPanelHeight
    noteButtonPanelHeight = scoreMarksButtonPanelHeight / 2
    octaveSelectorHeight = noteButtonPanelHeight / 12
    strokeButtonPanelHeight = scoreMarksButtonPanelHeight - noteButtonPanelHeight

    inputPanel = {
      width: 'max-content',
      maxWidth: inputPanelAspectRatio * inputPanelHeight,
      minHeight: minimumInputPanelHeight
    }

    updateShowHideButtonDimensions()
    updateTitleDimensions()
    updateOctaveSelectorDimensions()
    updateNoteButtonDimensions()
    updateStrokeButtonDimensions()
    updateJoinButtonDimensions()
    updateAccidentalButtonDimensions()
    updateDecorationButtonDimensions()
    updateEditOpsButtonDimensions()
  }

  function updateTitleDimensions () {
    const paddingTop = titlePanelHeight / 4
    const paddingBottom = titlePanelHeight / 3

    title = {
      minHeight: titlePanelHeight,
      maxHeight: titlePanelHeight,
      maxWidth: 0.2637 * inputPanelHeight,
      fontSize: titlePanelHeight - paddingTop - paddingBottom,
      paddingTop,
      paddingBottom
    }
  }

  function updateOctaveSelectorDimensions () {
    const marginBottom = octaveSelectorHeight / 5
    const padding = octaveSelectorHeight / 10
    const buttonImageHeight = octaveSelectorHeight - marginBottom - padding * 2

    octaveSelectorButton = {
      image: {
        width: buttonImageHeight * 2,
        height: buttonImageHeight
      },
      marginBottom,
      padding
    }
  }

  function updateShowHideButtonDimensions () {
    const noteButtonSize = noteButtonPanelHeight / 20
    const borderWidth = 1
    const padding = noteButtonSize / 5
    const buttonImageSize = noteButtonSize - 2 * (padding + borderWidth)

    showHideButton = {
      image: {
        width: buttonImageSize,
        height: buttonImageSize
      },
      borderRadius: 5,
      borderWidth,
      padding
    }
  }

  function updateNoteButtonDimensions () {
    const totalNoteButtonHeight = (noteButtonPanelHeight - octaveSelectorHeight) / 5
    const borderWidth = 3
    const marginVertical = totalNoteButtonHeight / 10
    const marginHorizontal = totalNoteButtonHeight * 0.15
    const noteButtonDiameter = totalNoteButtonHeight - 2 * marginVertical
    const padding = noteButtonDiameter / 5
    const buttonImageLength = noteButtonDiameter - 2 * (padding + borderWidth)

    noteButton = {
      image: {
        width: buttonImageLength,
        height: buttonImageLength
      },
      borderRadius: 50,
      borderWidth,
      width: noteButtonDiameter,
      height: noteButtonDiameter,
      minWidth: noteButtonDiameter,
      padding,
      marginVertical,
      marginHorizontal
    }
  }

  function updateStrokeButtonDimensions () {
    const buttonImageSize = strokeButtonPanelHeight / 12
    const borderWidth = 3
    const margin = buttonImageSize / 6
    const padding = buttonImageSize / 3 - borderWidth

    strokeButton = {
      image: {
        width: buttonImageSize,
        height: buttonImageSize
      },
      borderRadius: 5,
      borderWidth,
      padding,
      margin
    }
  }

  function updateJoinButtonDimensions () {
    const buttonImageSize = noteButtonPanelHeight / 13
    const borderWidth = 3
    const margin = buttonImageSize / 6
    const padding = buttonImageSize / 3 - borderWidth

    joinButton = {
      image: {
        width: buttonImageSize,
        height: buttonImageSize
      },
      borderRadius: 5,
      borderWidth,
      padding,
      margin
    }
  }

  function updateAccidentalButtonDimensions () {
    const buttonImageSize = noteButtonPanelHeight / 12
    const borderWidth = 3
    const margin = buttonImageSize / 6
    const padding = buttonImageSize / 3 - borderWidth

    accidentalButton = {
      image: {
        width: buttonImageSize,
        height: buttonImageSize
      },
      borderRadius: 5,
      borderWidth,
      padding,
      margin
    }
  }

  function updateDecorationButtonDimensions () {
    const buttonImageSize = noteButtonPanelHeight / 12
    const borderWidth = 3
    const margin = buttonImageSize / 6
    const padding = buttonImageSize / 3 - borderWidth

    decorationButton = {
      image: {
        width: buttonImageSize,
        height: buttonImageSize
      },
      borderRadius: 5,
      borderWidth,
      padding,
      margin
    }
  }

  function updateEditOpsButtonDimensions () {
    const totalOperationButtonHeight = editOpsPanelHeight
    const borderWidth = 1
    const margin = totalOperationButtonHeight / 10
    const operationButtonHeight = totalOperationButtonHeight - 2 * margin
    const padding = operationButtonHeight / 5
    const buttonImageHeight = operationButtonHeight - 2 * (padding + borderWidth)

    squareOperationButton = {
      image: {
        width: buttonImageHeight,
        height: buttonImageHeight
      },
      borderRadius: 5,
      borderWidth,
      padding,
      marginVertical: margin,
      marginHorizontal: margin
    }

    wideOperationButton = {
      ...squareOperationButton,
      image: {
        width: buttonImageHeight * wideButtonAspectRatio,
        height: buttonImageHeight,
        resizeMode: 'contain'
      }
    }
  }

  function getCursorStyle (markLengths) {
    return {
      ...cursor,
      top: markLengths * noteMark.image.height + lineEndButtonHeight
    }
  }

  function getOctaveSelectorButtonStyle (baseStyle) {
    return {
      selected: deepmerge(baseStyle.selected, octaveSelectorButton),
      unselected: deepmerge(baseStyle.unselected, octaveSelectorButton)
    }
  }

  function getJoinButtonStyle (baseStyle) {
    return {
      selected: deepmerge(baseStyle.selected, joinButton),
      unselected: deepmerge(baseStyle.unselected, joinButton)
    }
  }

  function getStrokeButtonStyle (relativeHeight) {
    const style = { ...strokeButton }
    const imageStyle = { ...strokeButton.image }
    if (relativeHeight) {
      imageStyle.height *= relativeHeight
      style.image = imageStyle
    }
    return style
  }

  function getNoteMarkStyle (relativeHeight) {
    const style = { ...noteMark }
    const imageStyle = { ...noteMark.image }
    if (relativeHeight) {
      imageStyle.height *= relativeHeight
      style.image = imageStyle
    }
    return style
  }

  function getDecorationMarkStyle (decorationName, hasAccidental) {
    const decoration = { ...decorationMark[decorationName] }
    if (decorationName === 'LeanTo') {
      decoration.left = hasAccidental ? -noteMark.image.width * 0.25 : -noteMark.image.width * 0.4
    } else {
      decoration.left = hasAccidental ? noteMark.image.width * 0.75 : noteMark.image.width * 0.6
    }
    return decoration
  }

  function getJoinStyle (size) {
    return {
      width: noteMark.image.width,
      height: size * noteMark.image.height,
      resizeMode: 'stretch'
    }
  }

  return {
    getCursorStyle,
    getLineWidth: () => lineWidth,
    getLineFullWidth: () => lineFullWidth,
    getLinePaddingRight: () => linePaddingRight,
    getLineSeparation: () => lineSeparation,
    getLineEndButtonHeight: () => lineEndButtonHeight,
    getInputViewStyle: () => inputPanel,
    getShowHideButtonStyle: () => showHideButton,
    getTitleStyle: () => title,
    getNoteButtonViewHeight: () => noteButtonPanelHeight,
    getNoteMarkStyle,
    getAccidentalMarkStyle: () => accidentalMark,
    getDecorationMarkStyle,
    getJoinStyle,
    getOctaveSelectorButtonStyle,
    getNoteButtonStyle: () => noteButton,
    getStrokeButtonStyle,
    getJoinButtonStyle,
    getAccidentalButtonStyle: () => accidentalButton,
    getDecorationButtonStyle: () => decorationButton,
    getSquareOperationButtonStyle: () => squareOperationButton,
    getWideOperationButtonStyle: () => wideOperationButton,
    getWindowStyle: () => window,
    setWindowDimensions
  }
}

export const DimensionsContext = createContext()
