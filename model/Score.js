import { createContext } from 'react'
import { nanoid } from 'nanoid'

import { Join, JoinPosition, MarkType } from '../data/ScoreLiterals'

function createScore (lines) {
  let join = Join.None
  let joinChanged = false
  let currentLine, lineCursor

  if (lines.length === 0) {
    lines.push([])
    currentLine = 0
    lineCursor = 0
    lines[0].id = '0'
  } else {
    currentLine = lines.length - 1
    lineCursor = lines[currentLine].length
  }

  const repairJoins = () => {
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

  const closeLastJoin = () => {
    if (lineCursor > 0 && lines[currentLine][lineCursor - 1].join !== Join.None) {
      lines[currentLine][lineCursor - 1].joinPosition = JoinPosition.End
      repairJoins()
    }
  }

  const setJoin = (joinType) => {
    join = joinType
    joinChanged = true
  }

  const goto = (line, index) => {
    currentLine = (line === undefined) ? lines.length - 1 : line
    lineCursor = (index === undefined) ? lines[currentLine].length : index
  }

  const createUnitMark = (unit) => {
    return {
      id: nanoid(),
      data: unit,
      join: Join.None
    }
  }

  const createNoteMark = (note) => {
    return {
      id: nanoid(),
      data: { ...note },
      join
    }
  }

  const addNote = (note) => {
    lines[currentLine].splice(lineCursor, 0, createNoteMark(note))
    if (lines[currentLine][lineCursor].join !== Join.None) {
      lines[currentLine][lineCursor].joinPosition = (joinChanged) ? JoinPosition.Start : JoinPosition.Middle
    }
    if (joinChanged) {
      closeLastJoin()
      joinChanged = false
    }
    lineCursor++
    codifyLine(currentLine)
  }

  const addOtherUnit = (unit) => {
    lines[currentLine].splice(lineCursor, 0, createUnitMark(unit))
    closeLastJoin()
    joinChanged = true
    lineCursor++
    codifyLine(currentLine)
  }

  const addAccidental = (accidental) => {
    const markIndex = lineCursor - 1
    if (markIndex >= 0 && lines[currentLine][markIndex].data.type === MarkType.Note) {
      const existingAccidental = lines[currentLine][markIndex].data.accidental
      if (existingAccidental && existingAccidental.name === accidental.name) {
        delete lines[currentLine][markIndex].data.accidental
      } else {
        lines[currentLine][markIndex].data.accidental = accidental
      }
    }
  }

  const addOtherDecoration = (decoration) => {
    const markIndex = lineCursor - 1
    if (markIndex >= 0 && lines[currentLine][markIndex].data.type === MarkType.Note) {
      const existingDecoration = lines[currentLine][markIndex].data.decoration
      if (existingDecoration && existingDecoration[decoration.name]) {
        delete existingDecoration[decoration.name]
      } else {
        existingDecoration[decoration.name] = decoration
      }
    }
  }

  const deleteMark = () => {
    if (lineCursor === 0) {
      if (currentLine !== 0) {
        lines[currentLine - 1].push(...lines[currentLine])
        lines.splice(currentLine, 1)
        currentLine--
        lineCursor = lines[currentLine].length
        codifyLine(currentLine)
      }
    } else {
      lines[currentLine].splice(lineCursor - 1, 1)
      lineCursor--
      codifyLine(currentLine)
    }
  }

  const newLine = () => {
    closeLastJoin()
    const newLine = lines[currentLine].splice(lineCursor)
    lines.splice(currentLine + 1, 0, newLine)
    codifyLine(currentLine)
    currentLine++
    lineCursor = 0
    codifyLine(currentLine)
  }

  const getLines = () => lines

  const getLineCount = () => lines.length

  const clone = () => {
    return createScore(lines)
  }

  const codifyLine = (index) => {
    lines[index].id = lines[index].reduce((codeFragment, currentMark) => `${codeFragment}${currentMark.id}`, index)
  }

  return { addNote, addOtherUnit, addAccidental, addOtherDecoration, clone, codifyLine, deleteMark, getLines, getLineCount, goto, newLine, setJoin }
}

export function createEmptyScore () {
  return createScore([])
}

export const ScoreContext = createContext()
