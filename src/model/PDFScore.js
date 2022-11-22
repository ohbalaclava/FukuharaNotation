import jsPDF from 'jspdf'
import Config from '../data/Config'
import { Decoration, getGlyph, Join } from '../data/ScoreLiterals'

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

  const author = {
    fontSize: 14,
    x: title.x - mm(14) - 3,
    y: margins.top + 1,
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
  const accidentalSize = markSize / 2
  const linesPerPage = (page) => page === 0 ? Config.linesPerPage - 1 : Config.linesPerPage
  const pageBreak = (lineNumber) => lineNumber === Config.linesPerPage - 1 || (lineNumber + 1) % Config.linesPerPage === 0

  const score = {
    lineWidth,
    mark: {
      height: markSize,
      halfHeight: markSize / 2,
      width: markSize,
      halfWidth: markSize / 2
    },
    accidental: {
      height: accidentalSize,
      halfHeight: accidentalSize / 2,
      width: accidentalSize
    },
    decoration: {
      height: markSize,
      width: markSize
    },
    join: {
      xOffset: markSize * 0.85
    },
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
    author,
    notes,
    score,
    linesPerPage,
    pageBreak
  }
}())

const getImage = (function () {
  const cache = new Map()
  return (markName) => {
    if (cache.has(markName)) {
      return cache.get(markName)
    } else {
      const glyph = getGlyph(markName)
      const image = new Image()
      image.src = glyph.source
      cache.set(markName, image)
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

  // eslint-disable-next-line new-cap
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  (function () { // constructor
    addTitle()
    addAuthor()
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

  function addAuthor () {
    doc.setFontSize(layout.author.fontSize)
    doc.text(
      score.getAuthor(),
      layout.author.x,
      layout.author.y,
      layout.author.opts
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
    markOrigin.x = layout.score.right - layout.score.lineWidth
    markOrigin.y = layout.score.top
  }

  function newLine () {
    markOrigin.x -= layout.score.lineWidth
    markOrigin.y = layout.score.top
  }

  function addLine (line) {
    line.marks.forEach((mark) => {
      addMark(mark)
    })
  }

  function addMark (mark) {
    doc.addImage(
      getImage(mark.name),
      'PNG',
      markOrigin.x,
      markOrigin.y,
      layout.score.mark.width,
      layout.score.mark.height * mark.height
    )

    mark.accidental && addAccidental(mark.accidental)
    mark.decorations && addDecorations(mark.decorations, mark.accidental !== undefined)
    if (mark.join !== Join.None) {
      addJoin(mark.join, mark.joinLength)
    }

    markOrigin.y += mark.height * layout.score.mark.height
  }

  function addAccidental (accidental, markIndex) {
    doc.addImage(
      getImage(accidental.name),
      'PNG',
      markOrigin.x + layout.score.mark.width - 3,
      markOrigin.y + layout.score.mark.halfHeight - layout.score.accidental.halfHeight - 2,
      layout.score.accidental.width,
      layout.score.accidental.height
    )
  }

  function addDecorations (decorations, hasAccidental) {
    decorations.forEach((decoration) => {
      let x, y, width, height
      if (decoration.name === Decoration.LeanTo) {
        x = markOrigin.x
        y = markOrigin.y - 1
        width = layout.score.decoration.width
        if (hasAccidental) {
          width += layout.score.accidental.width
        }
        height = layout.score.decoration.height
      } else { // Decoration.Dot
        x = markOrigin.x + layout.score.mark.halfWidth + 1
        if (hasAccidental) {
          x += layout.score.accidental.width
        }
        y = markOrigin.y
        width = layout.score.decoration.width
        height = layout.score.decoration.height
      }
      doc.addImage(getImage(decoration.name), 'PNG', x, y, width, height)
    })
  }

  function addJoin (type, length) {
    if (length) {
      doc.addImage(
        getImage(type),
        'PNG',
        markOrigin.x + layout.score.join.xOffset,
        markOrigin.y,
        layout.score.mark.width,
        layout.score.mark.height * length
      )
    }
  }

  return doc
}
