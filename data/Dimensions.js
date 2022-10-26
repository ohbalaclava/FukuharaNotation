import Config from './Config'
import { createContext } from 'react'

export const scoreContentPadding = 20
export const scoreLineMarginRight = 5
export const inputPanelMargin = 20

const wideButtonAspectRatio = 1.5
const inputPanelAspectRatio = 0.37

export default function Dimensions (window) {
  let inputPanelHeight
  let noteButtonPanelHeight
  let operationsPanelHeight
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
  let noteButton
  let unitButton
  let accidentalButton
  let accidentalButtonPanel
  let decorationButton
  let decorationButtonPanel
  let squareOperationButton
  let wideOperationButton
  let titlePanelHeight
  let title

  setWindowDimensions(window)

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
    inputPanelHeight = window.height - inputPanelMargin * 2
    titlePanelHeight = inputPanelHeight / 24
    noteButtonPanelHeight = inputPanelHeight * 0.77
    operationsPanelHeight = inputPanelHeight - noteButtonPanelHeight - titlePanelHeight

    inputPanel = {
      minWidth: inputPanelHeight * inputPanelAspectRatio
    }

    updateTitleDimensions()
    updateNoteButtonDimensions()
    updateUnitButtonDimensions()
    updateAccidentalButtonDimensions()
    updateDecorationButtonDimensions()
    updateOperationButtonDimensions()
  }

  function updateTitleDimensions () {
    const padding = titlePanelHeight / 5
    title = {
      minHeight: titlePanelHeight,
      fontSize: titlePanelHeight - 2 * padding,
      padding
    }
  }

  function updateNoteButtonDimensions () {
    const totalNoteButtonHeight = noteButtonPanelHeight / 9
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

  function updateUnitButtonDimensions () {
    unitButton = {
      image: {
        ...noteButton.image
      },
      borderRadius: 5,
      borderWidth: 1,
      padding: noteButton.padding,
      marginVertical: noteButton.marginVertical + 2,
      marginHorizontal: noteButton.marginHorizontal
    }
  }

  function updateAccidentalButtonDimensions () {
    const totalAccidentalButtonHeight = noteButtonPanelHeight / 9
    const borderWidth = 3
    const margin = totalAccidentalButtonHeight / 10
    const accidentalButtonLength = totalAccidentalButtonHeight - 2 * margin
    const padding = accidentalButtonLength / 5
    const buttonImageLength = accidentalButtonLength - 2 * (padding + borderWidth)

    accidentalButton = {
      image: {
        width: buttonImageLength,
        height: buttonImageLength
      },
      borderRadius: 5,
      borderWidth,
      width: accidentalButtonLength,
      height: accidentalButtonLength,
      padding,
      marginVertical: margin,
      marginHorizontal: margin
    }

    accidentalButtonPanel = {
      margin
    }
  }

  function updateDecorationButtonDimensions () {
    const totalDecorationButtonHeight = noteButtonPanelHeight / 9
    const borderWidth = 3
    const margin = totalDecorationButtonHeight / 10
    const decorationButtonLength = totalDecorationButtonHeight - 2 * margin
    const padding = decorationButtonLength / 5
    const buttonImageLength = decorationButtonLength - 2 * (padding + borderWidth)

    decorationButton = {
      image: {
        width: buttonImageLength,
        height: buttonImageLength
      },
      borderRadius: 5,
      borderWidth,
      width: decorationButtonLength,
      height: decorationButtonLength,
      padding,
      marginVertical: margin,
      marginHorizontal: margin
    }

    decorationButtonPanel = {
      margin
    }
  }

  function updateOperationButtonDimensions () {
    const totalOperationButtonHeight = operationsPanelHeight / 2
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

  function getCursorStyle (markLengths) {
    return {
      ...cursor,
      top: markLengths * noteMark.image.height + lineEndButtonHeight
    }
  }

  function getUnitButtonStyle (relativeHeight) {
    const style = { ...unitButton }
    const imageStyle = { ...unitButton.image }
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

  return {
    getCursorStyle,
    getLineWidth: () => lineWidth,
    getLineFullWidth: () => lineFullWidth,
    getLinePaddingRight: () => linePaddingRight,
    getLineSeparation: () => lineSeparation,
    getLineEndButtonHeight: () => lineEndButtonHeight,
    getInputViewStyle: () => inputPanel,
    getTitleStyle: () => title,
    getNoteButtonViewHeight: () => noteButtonPanelHeight,
    getNoteMarkStyle,
    getAccidentalMarkStyle: () => accidentalMark,
    getDecorationMarkStyle: (decorationName) => decorationMark[decorationName],
    getNoteButtonStyle: () => noteButton,
    getUnitButtonStyle,
    getAccidentalButtonViewStyle: () => accidentalButtonPanel,
    getAccidentalButtonStyle: () => accidentalButton,
    getDecorationButtonViewStyle: () => decorationButtonPanel,
    getDecorationButtonStyle: () => decorationButton,
    getOperationButtonViewHeight: () => operationsPanelHeight,
    getSquareOperationButtonStyle: () => squareOperationButton,
    getWideOperationButtonStyle: () => wideOperationButton,
    getWindowStyle: () => window,
    setWindowDimensions
  }
}

export const DimensionsContext = createContext()
