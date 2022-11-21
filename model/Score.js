import { version as appVersion } from '../package.json'
import { nanoid } from 'nanoid'

import { Join, JoinPosition, MarkType } from '../data/ScoreLiterals'
import Config from '../data/Config'

export function createScore ({ docId, title, notes, lines, currentLine, lineCursor, join, joinChanged, version }) {
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

  function postEdit () {
    postEditHook && postEditHook()
  }

  function processJoins () {
    let startMark
    let inJoin = Join.None
    for (const mark of lines[currentLine].marks) {
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
    if (lineCursor > 0 && lines[currentLine].marks[lineCursor - 1].join !== Join.None) {
      lines[currentLine].marks[lineCursor - 1].joinPosition = JoinPosition.End
    }
  }

  function setJoin (joinType) {
    join = joinType
    joinChanged = true
  }

  function goto (line, index) {
    currentLine = (line === undefined) ? lines.length - 1 : line
    lineCursor = (index === undefined) ? lines[currentLine].marks.length : index
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
      lines[currentLine].marks.splice(lineCursor, 0, noteMark)
      if (lines[currentLine].marks[lineCursor].join !== Join.None) {
        lines[currentLine].marks[lineCursor].joinPosition = (joinChanged) ? JoinPosition.Start : JoinPosition.Middle
      }

      if (joinChanged) {
        closeLastJoin()
        joinChanged = false
      }

      lineCursor++
      lines[currentLine].marksLength += noteMark.height
    }

    const newLineLength = lines[currentLine].marksLength + noteMark.height
    if (newLineLength <= Config.maxLineLength) {
      doAddNote()
    } else if (lineCursor === lines[currentLine].marks.length) {
      newLine()
      doAddNote()
    }

    processJoins()
    postEdit()
  }

  function addStroke (stroke) {
    const mark = createStrokeMark(stroke)
    const doAddMark = () => {
      lines[currentLine].marks.splice(lineCursor, 0, mark)

      closeLastJoin()
      joinChanged = true

      lineCursor++
      lines[currentLine].marksLength += mark.height
    }

    const newLineLength = lines[currentLine].marksLength + mark.height
    if (newLineLength <= Config.maxLineLength) {
      doAddMark()
    } else if (lineCursor === lines[currentLine].marks.length) {
      newLine()
      doAddMark()
    }

    processJoins()
    postEdit()
  }

  function addAccidental (accidental) {
    const markIndex = lineCursor - 1
    if (markIndex >= 0 && lines[currentLine].marks[markIndex].type === MarkType.Note) {
      const existingAccidental = lines[currentLine].marks[markIndex].accidental
      if (existingAccidental && existingAccidental.name === accidental.name) {
        delete lines[currentLine].marks[markIndex].accidental
      } else {
        lines[currentLine].marks[markIndex].accidental = createSimpleMark(accidental)
      }
      postEdit()
    }
  }

  function addDecoration (decoration) {
    const markIndex = lineCursor - 1
    if (markIndex >= 0 && lines[currentLine].marks[markIndex].type === MarkType.Note) {
      let existingDecorations = lines[currentLine].marks[markIndex].decorations
      if (!existingDecorations) {
        existingDecorations = lines[currentLine].marks[markIndex].decorations = new Map()
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
        lines[currentLine - 1].marks.push(...lines[currentLine].marks)
        lines.splice(currentLine, 1)
        currentLine--
        lineCursor = lines[currentLine].marks.length
        processJoins()
        postEdit()
      }
    } else {
      const markIndex = lineCursor - 1
      const markLength = lines[currentLine].marks[markIndex].height
      lines[currentLine].marks.splice(markIndex, 1)
      lineCursor--
      lines[currentLine].marksLength -= markLength
      processJoins()
      postEdit()
    }
  }

  function newLine () {
    closeLastJoin()
    const newLine = {}
    newLine.marks = lines[currentLine].marks.splice(lineCursor)
    newLine.id = nanoid()
    newLine.marksLength = 0
    lines.splice(currentLine + 1, 0, newLine)
    currentLine++
    lineCursor = 0
    processJoins()
    postEdit()
  }

  function serialise () {
    return JSON.stringify({
      docId, title, notes, lines, currentLine, lineCursor, version
    }, (key, value) => {
      if (key !== 'id') { // strip ids
        return value
      }
    })
  }

  function getCurrentMarkIndexInLengths () {
    return lines[currentLine].marks.reduce((total, mark, index) => {
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
    lines[0].marksLength = 0
    joinChanged = false
  }

  return {
    addNote,
    addStroke,
    addAccidental,
    addDecoration,
    clear,
    clone: () => createScore({ docId, title, notes, lines, currentLine, lineCursor, join, joinChanged, version }),
    deleteMark,
    getID: () => docId,
    getTitle: () => title,
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
    setNotes: newNotes => { notes = newNotes },
    onEdit: func => { postEditHook = func },
    isEmpty: () => lines.length === 1 && lines[0].marks.length === 0
  }
}

export function createEmptyScore () {
  return createScore({
    title: 'Untitled',
    notes: '',
    lines: [],
    currentLine: 0,
    lineCursor: 0,
    join: Join.None,
    joinChanged: false,
    version: appVersion
  })
}
