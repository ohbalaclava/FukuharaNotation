import jsPDF from 'jspdf'

const mm = pt => 0.3528 * pt

const A4Layout = (function () {
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

  return {
    dimensions,
    marginSizes,
    margins,
    title,
    notes
  }
}())

export default function getPDFScore (score) {
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
    doc.setFontSize(A4Layout.title.fontSize)
    doc.text(
      score.getTitle(),
      A4Layout.title.x,
      A4Layout.title.y,
      A4Layout.title.opts
    )
  }

  function addNotes () {
    doc.setFontSize(A4Layout.notes.fontSize)
    doc.text(
      score.getNotes(),
      A4Layout.notes.x,
      A4Layout.notes.y,
      A4Layout.notes.opts
    )
  }

  function addLines () {
    const lines = score.getLines()
  }

  function addLine (line) {

  }

  function addMark (mark) {

  }

  return doc
}
