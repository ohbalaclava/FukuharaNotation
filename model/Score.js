import { nanoid } from 'nanoid'

import { Join, JoinPosition, MarkType } from '../data/ScoreLiterals'
import Config from '../data/Config'

export function createScore ({ docId, title, lines, currentLine, lineCursor }) {
  let join = Join.None
  let joinChanged = false
  let postEditHook

  // constructor
  (function () {
    docId = docId || nanoid()
    currentLine = currentLine || 0
    lineCursor = lineCursor || 0

    if (lines.length === 0) {
      lines.push([])
      currentLine = 0
      lineCursor = 0
      lines[0].id = nanoid()
    } else {
      lines.forEach(line => {
        line.id = line.id || nanoid()
        line.forEach(mark => {
          mark.id = mark.id || nanoid()
        })
      })
    }
  })()

  function postEdit () {
    postEditHook && postEditHook()
  }

  function repairJoins () {
    let inJoin = false
    for (const mark of lines[currentLine]) {
      if (mark.join !== Join.None) {
        if (inJoin) {
          switch (mark.joinPosition) {
            case JoinPosition.Start:
              mark.joinPosition = JoinPosition.Middle
              break
            case JoinPosition.End:
              inJoin = false
              break
          }
        } else {
          switch (mark.joinPosition) {
            case JoinPosition.Start:
              inJoin = true
              break
            case JoinPosition.Middle:
              inJoin = true
              mark.joinPosition = JoinPosition.Start
              break
          }
        }
      }
    }
  }

  function closeLastJoin () {
    if (lineCursor > 0 && lines[currentLine][lineCursor - 1].join !== Join.None) {
      lines[currentLine][lineCursor - 1].joinPosition = JoinPosition.End
      repairJoins()
    }
  }

  function setJoin (joinType) {
    join = joinType
    joinChanged = true
  }

  function goto (line, index) {
    currentLine = (line === undefined) ? lines.length - 1 : line
    lineCursor = (index === undefined) ? lines[currentLine].length : index
  }

  function createSimpleMark (fullMark) {
    return {
      id: nanoid(),
      type: fullMark.type,
      name: fullMark.name
    }
  }

  function createNoteMark (note) {
    const mark = createSimpleMark(note)
    mark.join = join

    return mark
  }

  function addNote (note) {
    lines[currentLine].splice(lineCursor, 0, createNoteMark(note))
    if (lines[currentLine][lineCursor].join !== Join.None) {
      lines[currentLine][lineCursor].joinPosition = (joinChanged) ? JoinPosition.Start : JoinPosition.Middle
    }

    if (joinChanged) {
      closeLastJoin()
      joinChanged = false
    }

    if (++lineCursor === Config.maxLineLength) {
      newLine()
    } else {
      postEdit()
    }
  }

  function addOtherUnit (unit) {
    lines[currentLine].splice(lineCursor, 0, createSimpleMark(unit))

    closeLastJoin()
    joinChanged = true

    if (++lineCursor === Config.maxLineLength) {
      newLine()
    } else {
      postEdit()
    }
  }

  function addAccidental (accidental) {
    const markIndex = lineCursor - 1
    if (markIndex >= 0 && lines[currentLine][markIndex].type === MarkType.Note) {
      const existingAccidental = lines[currentLine][markIndex].accidental
      if (existingAccidental && existingAccidental.name === accidental.name) {
        delete lines[currentLine][markIndex].accidental
      } else {
        lines[currentLine][markIndex].accidental = createSimpleMark(accidental)
      }
      postEdit()
    }
  }

  function addOtherDecoration (decoration) {
    const markIndex = lineCursor - 1
    if (markIndex >= 0 && lines[currentLine][markIndex].type === MarkType.Note) {
      const existingDecoration = lines[currentLine][markIndex].decoration
      if (existingDecoration && existingDecoration[decoration.name]) {
        delete existingDecoration[decoration.name]
      } else {
        existingDecoration[decoration.name] = createSimpleMark(decoration)
      }
      postEdit()
    }
  }

  function deleteMark () {
    if (lineCursor === 0) {
      if (currentLine !== 0) {
        lines[currentLine - 1].push(...lines[currentLine])
        lines.splice(currentLine, 1)
        currentLine--
        lineCursor = lines[currentLine].length
        postEdit()
      }
    } else {
      lines[currentLine].splice(lineCursor - 1, 1)
      lineCursor--
      postEdit()
    }
  }

  function newLine () {
    closeLastJoin()
    const newLine = lines[currentLine].splice(lineCursor)
    lines.splice(currentLine + 1, 0, newLine)
    currentLine++
    lineCursor = 0
    lines[currentLine].id = nanoid()
    postEdit()
  }

  function serialise () {
    return JSON.stringify({
      docId, title, lines, currentLine, lineCursor
    }, (key, value) => {
      if (key !== 'id') { // strip ids
        return value
      }
    })
  }

  return {
    addNote,
    addOtherUnit,
    addAccidental,
    addOtherDecoration,
    clone: () => createScore({ docId, title, lines, currentLine, lineCursor }),
    deleteMark,
    getID: () => docId,
    getTitle: () => title,
    getCurrentLineIndex: () => currentLine,
    getCurrentMarkIndex: () => lineCursor,
    getLines: () => lines,
    getLineCount: () => lines.length,
    goto,
    newLine,
    serialise,
    setJoin,
    setTitle: newTitle => { title = newTitle },
    onEdit: func => { postEditHook = func }
  }
}

export function createEmptyScore () {
  return createScore({ title: 'Untitled', lines: [], currentLine: 0, lineCursor: 0 })
}
