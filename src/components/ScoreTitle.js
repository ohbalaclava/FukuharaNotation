import m from 'mithril'

import Modal from './Modal'
import { dims } from '../data/dimensionsStore'
import { toCSS } from '../styles/StyleUtils'
import Config from '../data/Config'

// The panel label renders from attrs (the score), not copied state, so a
// replacement score (upload) shows its own title. Edit state is local to the
// dialog and reseeded from attrs on open, which also makes Cancel a no-op.

export default function ScoreTitle () {
  let dialogVisible = false
  let updatedTitle
  let updatedAuthor
  let updatedNotes

  function trim (text) {
    return (text.length > 24) ? `${text.substring(0, 21)}...` : text
  }

  function replaceLineBreaks (text) {
    return text.replaceAll('\n', '  ')
  }

  return {
    view ({ attrs }) {
      const openDialog = () => {
        updatedTitle = attrs.title
        updatedAuthor = attrs.author
        updatedNotes = attrs.notes
        dialogVisible = true
      }

      const closeDialog = (commit) => {
        dialogVisible = false
        if (commit) {
          attrs.onOK && attrs.onOK(updatedTitle, updatedAuthor, updatedNotes)
        } else {
          attrs.onCancel && attrs.onCancel()
        }
      }

      return m('div.v', [
        m('span.score-title-text.clickable', {
          style: toCSS(dims.getTitleStyle()),
          onclick: openDialog
        }, trim(attrs.title || '')),

        m(Modal, { visible: dialogVisible },
          m('div.v.title-dialog', [
            m('div.v.title-dialog-text', [
              m('span.dialog-label', 'Title'),
              m('input.title-input', {
                value: updatedTitle,
                oninput: (event) => { updatedTitle = event.target.value },
                onfocus: (event) => event.target.select()
              }),
              m('span.dialog-label', 'Author'),
              m('input.author-input', {
                value: updatedAuthor,
                oninput: (event) => { updatedAuthor = event.target.value },
                onfocus: (event) => event.target.select()
              }),
              m('span.dialog-label', 'Notes'),
              m('textarea.notes-input', {
                value: updatedNotes,
                rows: 5,
                maxlength: Config.maxNotesLength,
                oninput: (event) => { updatedNotes = replaceLineBreaks(event.target.value) }
              })
            ]),
            m('div.v.dialog-buttons', [
              m('button.dialog-btn', { onclick: () => closeDialog(true) }, 'OK'),
              m('button.dialog-btn', { onclick: () => closeDialog(false) }, 'Cancel')
            ])
          ])
        )
      ])
    }
  }
}
