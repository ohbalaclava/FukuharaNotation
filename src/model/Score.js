import { version as packageVersion } from '../../package.json'
import { nanoid } from 'nanoid'

import { Join, JoinPosition, MarkType } from '../data/ScoreLiterals'
import Config from '../data/Config'
import { toJSON } from '../tools/Persistence'

export function createScore ({ docId, title, author, notes, lines, currentLine, lineCursor, join, joinChanged, version }) {
  let postEditHook

  // constructor
  (function () {
    docId = docId || nanoid()

    if (lines.length === 0) {
      clear()
    } else {
      currentLine = currentLine || 0
      lineCursor = lineCursor || 0
      lines.forEach(line => {
        line.id = line.id || nanoid()
        line.marks.forEach(mark => {
          mark.id = mark.id || nanoid()
        })
      })
    }
  })()

  function currentMarks () {
    return lines[currentLine].marks
  }

  function currentMark () {
    return lines[currentLine].marks[lineCursor]
  }

  function previousMark () {
    return lines[currentLine].marks[lineCursor - 1]
  }

  function postEdit () {
    postEditHook && postEditHook()
  }

  function processJoins () {
    let startMark
    let inJoin = Join.None
    for (const mark of currentMarks()) {
      if (mark.join !== Join.None) {
        if (inJoin === mark.join && mark.joinPosition !== JoinPosition.Start) {
          startMark.joinLength++
          if (mark.joinPosition === JoinPosition.End) {
            inJoin = Join.None
          }
        } else {
          startMark = mark
          startMark.joinLength = 1
          if (mark.joinPosition !== JoinPosition.End) {
            inJoin = mark.join
            if (mark.joinPosition === JoinPosition.Middle) {
              mark.joinPosition = JoinPosition.Start
            }
          }
        }
      }
    }
  }

  function closeLastJoin () {
    if (lineCursor > 0 && previousMark().join !== Join.None) {
      previousMark().joinPosition = JoinPosition.End
    }
  }

  function setJoin (joinType) {
    join = joinType
    joinChanged = true
  }

  function goto (line, index) {
    currentLine = (line === undefined) ? lines.length - 1 : line
    lineCursor = (index === undefined) ? currentMarks().length : index
  }

  function createSimpleMark (fullMark) {
    return {
      id: nanoid(),
      type: fullMark.type,
      name: fullMark.name,
      height: fullMark.glyph.relativeHeight || 1
    }
  }

  function createNoteMark (note) {
    const mark = createSimpleMark(note)
    mark.join = join

    return mark
  }

  function createStrokeMark (note) {
    const mark = createSimpleMark(note)
    mark.join = Join.None

    return mark
  }

  function addNote (note) {
    const noteMark = createNoteMark(note)
    const doAddNote = () => {
      currentMarks().splice(lineCursor, 0, noteMark)
      if (currentMark().join !== Join.None) {
        currentMark().joinPosition = (joinChanged) ? JoinPosition.Start : JoinPosition.Middle
      }

      if (joinChanged) {
        closeLastJoin()
        joinChanged = false
      }

      lineCursor++
      lines[currentLine].height += noteMark.height
    }

    const newLineLength = lines[currentLine].height + noteMark.height
    if (newLineLength <= Config.maxLineLength) {
      doAddNote()
    } else if (lineCursor === currentMarks().length) {
      newLine()
      doAddNote()
    }

    processJoins()
    postEdit()
  }

  function addStroke (stroke) {
    const mark = createStrokeMark(stroke)
    const doAddMark = () => {
      currentMarks().splice(lineCursor, 0, mark)

      closeLastJoin()
      joinChanged = true

      lineCursor++
      lines[currentLine].height += mark.height
    }

    const newLineLength = lines[currentLine].height + mark.height
    if (newLineLength <= Config.maxLineLength) {
      doAddMark()
    } else if (lineCursor === currentMarks().length) {
      newLine()
      doAddMark()
    }

    processJoins()
    postEdit()
  }

  function addAccidental (accidental) {
    if (lineCursor > 0 && previousMark().type === MarkType.Note) {
      const existingAccidental = previousMark().accidental
      if (existingAccidental && existingAccidental.name === accidental.name) {
        delete previousMark().accidental
      } else {
        previousMark().accidental = createSimpleMark(accidental)
      }
      postEdit()
    }
  }

  function addDecoration (decoration) {
    if (lineCursor > 0 && previousMark().type === MarkType.Note) {
      let existingDecorations = previousMark().decorations
      if (!existingDecorations) {
        existingDecorations = previousMark().decorations = new Map()
      }
      if (existingDecorations && existingDecorations.has(decoration.name)) {
        existingDecorations.delete(decoration.name)
      } else {
        existingDecorations.set(decoration.name, createSimpleMark(decoration))
      }
      postEdit()
    }
  }

  function deleteMark () {
    if (lineCursor === 0) {
      if (currentLine !== 0) {
        lines[currentLine - 1].marks.push(...currentMarks())
        lines.splice(currentLine, 1)
        currentLine--
        lineCursor = currentMarks().length
        processJoins()
        postEdit()
      }
    } else {
      const markHeight = previousMark().height
      currentMarks().splice(lineCursor - 1, 1)
      lineCursor--
      lines[currentLine].height -= markHeight
      processJoins()
      postEdit()
    }
  }

  function newLine () {
    closeLastJoin()
    const newLine = {}
    newLine.marks = currentMarks().splice(lineCursor)
    newLine.id = nanoid()
    newLine.height = 0
    lines.splice(currentLine + 1, 0, newLine)
    currentLine++
    lineCursor = 0
    processJoins()
    postEdit()
  }

  function serialise () {
    return toJSON({
      docId, title, notes, lines, currentLine, lineCursor, version
    }, (key, value) => {
      if (key !== 'id') { // strip ids
        return value
      }
    })
  }

  function getCurrentMarkIndexInLengths () {
    return currentMarks().reduce((total, mark, index) => {
      return (index < lineCursor) ? total + mark.height : total
    }, 0)
  }

  function clear () {
    if (lines.length > 0) {
      lines = []
    }
    lines.push({})
    currentLine = 0
    lineCursor = 0
    lines[0].marks = []
    lines[0].id = nanoid()
    lines[0].height = 0
    joinChanged = false
  }

  return {
    addNote,
    addStroke,
    addAccidental,
    addDecoration,
    clear,
    clone: () => createScore({ docId, title, author, notes, lines, currentLine, lineCursor, join, joinChanged, version }),
    deleteMark,
    getID: () => docId,
    getTitle: () => title,
    getAuthor: () => author,
    getNotes: () => notes,
    getJoin: () => join,
    getCurrentLineIndex: () => currentLine,
    getCurrentMarkIndex: () => lineCursor,
    getCurrentMarkIndexInLengths,
    getLines: () => lines,
    getLineCount: () => lines.length,
    goto,
    newLine,
    serialise,
    setJoin,
    setTitle: newTitle => { title = newTitle },
    setAuthor: newAuthor => { author = newAuthor },
    setNotes: newNotes => { notes = newNotes },
    onEdit: func => { postEditHook = func },
    isEmpty: () => lines.length === 1 && lines[0].marks.length === 0
  }
}

export function createEmptyScore () {
  return createScore({
    title: 'Untitled',
    author: '',
    notes: '',
    lines: [],
    currentLine: 0,
    lineCursor: 0,
    join: Join.None,
    joinChanged: false,
    version: packageVersion
  })
}
