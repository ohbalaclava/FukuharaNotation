import showhidePng from '../assets/operations/showhide.png'
import backspacePng from '../assets/operations/backspace.png'
import turnUpPng from '../assets/operations/turn_up.png'
import downloadPng from '../assets/operations/download.png'
import uploadPng from '../assets/operations/upload.png'
import pdfPng from '../assets/operations/pdf.png'
import crossPng from '../assets/operations/cross.png'
import menuPng from '../assets/operations/menu.png'
import ryoPng from '../assets/operations/ryo.png'
import kanPng from '../assets/operations/kan.png'
import daikanPng from '../assets/operations/daikan.png'

export const OperationButtons = {
  showhide: {
    style: 'showHideButton',
    glyph: showhidePng
  },
  delete: {
    style: 'operationButton',
    glyph: backspacePng
  },
  newline: {
    style: 'operationButton',
    glyph: turnUpPng
  },
  download: {
    style: 'operationButton',
    glyph: downloadPng
  },
  upload: {
    style: 'operationButton',
    glyph: uploadPng
  },
  pdf: {
    style: 'operationButton',
    glyph: pdfPng
  },
  clear: {
    style: 'operationButton',
    glyph: crossPng
  },
  menu: {
    style: 'menuButton',
    glyph: menuPng
  }
}

export const OctaveButtons = {
  ryo: {
    style: 'octaveButton',
    glyph: ryoPng
  },
  kan: {
    style: 'octaveButton',
    glyph: kanPng
  },
  daikan: {
    style: 'octaveButton',
    glyph: daikanPng
  }
}
