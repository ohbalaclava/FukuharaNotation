import jsPDF from 'jspdf'
import Config from '../data/Config'
import { getGlyph } from '../data/ScoreLiterals'

const mm = pt => 0.3528 * pt

const A4PortraitLayout = (function () {
  const name = 'a4'
  const orientation = 'portrait'

  const marginSizes = {
    vertical: 15,
    horizontal: 10
  }

  const dimensions = {
    width: 210,
    height: 297
  }

  const usable = {
    width: dimensions.width - 2 * marginSizes.horizontal,
    height: dimensions.height - 2 * marginSizes.vertical
  }

  const margins = {
    top: marginSizes.vertical,
    left: marginSizes.horizontal,
    bottom: dimensions.height - marginSizes.vertical,
    right: dimensions.width - marginSizes.horizontal
  }

  const title = {
    fontSize: 22,
    x: margins.right - mm(22),
    y: margins.top,
    opts: {
      align: 'left',
      rotationDirection: 0,
      angle: 90,
      maxWidth: usable.height * 0.4
    }
  }

  const notes = {
    fontSize: 12,
    x: margins.right - mm(12),
    y: usable.height * 0.4 + margins.top,
    opts: {
      align: 'left',
      rotationDirection: 0,
      angle: 90,
      maxWidth: usable.height * 0.6
    }
  }

  const lineWidth = usable.width / Config.linesPerPage
  const markSize = Math.min(usable.height / Config.maxLineLength, lineWidth)
  const linesPerPage = (page) => page === 0 ? Config.linesPerPage - 1 : Config.linesPerPage
  const pageBreak = (lineNumber) => lineNumber === Config.linesPerPage - 1 || (lineNumber + 1) % Config.linesPerPage === 0

  const score = {
    lineWidth,
    markHeight: markSize,
    markWidth: markSize,
    top: margins.top,
    right: margins.right,
    firstPageRight: margins.left + linesPerPage(0) * lineWidth
  }

  return {
    name,
    orientation,
    dimensions,
    marginSizes,
    margins,
    title,
    notes,
    score,
    linesPerPage,
    pageBreak
  }
}())

const getImage = (function () {
  const cache = new Map()
  return (mark) => {
    if (cache.has(mark.name)) {
      return cache.get(mark.name)
    } else {
      const glyph = getGlyph(mark.name)
      const image = new Image()
      image.src = glyph.source
      cache.set(mark.name, image)
      return image
    }
  }
}())

export default function getPDFScore (score) {
  const layout = A4PortraitLayout

  const markOrigin = {
    x: layout.score.firstPageRight - layout.score.lineWidth,
    y: layout.score.top
  }
  let page = 0

  // eslint-disable-next-line new-cap
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  (function () { // constructor
    addTitle()
    addNotes()
    addLines()
  }())

  function addTitle () {
    doc.setFontSize(layout.title.fontSize)
    doc.text(
      score.getTitle(),
      layout.title.x,
      layout.title.y,
      layout.title.opts
    )
  }

  function addNotes () {
    doc.setFontSize(layout.notes.fontSize)
    doc.text(
      score.getNotes(),
      layout.notes.x,
      layout.notes.y,
      layout.notes.opts
    )
  }

  function addLines () {
    score.getLines().forEach((line, index) => {
      layout.pageBreak(index) && newPage()
      addLine(line)
      newLine()
    })
  }

  function newPage () {
    doc.addPage(layout.name, layout.orientation)
    page++
    markOrigin.x = layout.score.right - layout.score.lineWidth
    markOrigin.y = layout.score.top
  }

  function newLine () {
    markOrigin.x -= layout.score.lineWidth
    markOrigin.y = layout.score.top
  }

  function addLine (line) {
    line.forEach((mark) => {
      addMark(mark)
    })
  }

  function addMark (mark) {
    doc.addImage(getImage(mark), 'PNG', markOrigin.x, markOrigin.y, layout.score.markWidth, layout.score.markHeight * mark.height)

    mark.accidental && addAccidental(mark.accidental)
    mark.decoration && addDecoration(mark.decoration)

    markOrigin.y += mark.height * layout.score.markHeight
  }

  function addAccidental (accidental, markIndex) {
    // draw accidental
  }

  function addDecoration (decoration, markIndex) {
    // draw decoration
  }

  return doc
}
