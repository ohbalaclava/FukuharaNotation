import { nanoid } from 'nanoid'

import { Join, JoinPosition, MarkType } from '../data/ScoreLiterals'
import Config from '../data/Config'

function createScore ({ id, title, lines, currentLine, lineCursor }) {
  let join = Join.None
  let joinChanged = false
  let postEditHook

  if (lines.length === 0) {
    lines.push([])
    currentLine = 0
    lineCursor = 0
    lines[0].id = nanoid()
  }

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

  function createUnitMark (unit) {
    return {
      id: nanoid(),
      data: unit,
      join: Join.None
    }
  }

  function createNoteMark (note) {
    return {
      id: nanoid(),
      data: { ...note },
      join
    }
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
    lines[currentLine].splice(lineCursor, 0, createUnitMark(unit))

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
    if (markIndex >= 0 && lines[currentLine][markIndex].data.type === MarkType.Note) {
      const existingAccidental = lines[currentLine][markIndex].data.accidental
      if (existingAccidental && existingAccidental.name === accidental.name) {
        delete lines[currentLine][markIndex].data.accidental
      } else {
        lines[currentLine][markIndex].data.accidental = accidental
      }
      postEdit()
    }
  }

  function addOtherDecoration (decoration) {
    const markIndex = lineCursor - 1
    if (markIndex >= 0 && lines[currentLine][markIndex].data.type === MarkType.Note) {
      const existingDecoration = lines[currentLine][markIndex].data.decoration
      if (existingDecoration && existingDecoration[decoration.name]) {
        delete existingDecoration[decoration.name]
      } else {
        existingDecoration[decoration.name] = decoration
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
      id, title, lines, currentLine, lineCursor
    })
  }

  return {
    addNote,
    addOtherUnit,
    addAccidental,
    addOtherDecoration,
    clone: () => createScore({ id, title, lines, currentLine, lineCursor }),
    deleteMark,
    getID: () => id,
    getTitle: () => title,
    getCurrentLineIndex: () => currentLine,
    getCurrentMarkIndex: () => lineCursor,
    getLines: () => lines,
    getLineCount: () => lines.length,
    goto,
    newLine,
    serialise,
    setJoin,
    setTitle: (newTitle) => { title = newTitle },
    onEdit: (func) => { postEditHook = func }
  }
}

export function createEmptyScore () {
  return createScore({ id: nanoid(), title: '', lines: [], currentLine: 0, lineCursor: 0 })
}
