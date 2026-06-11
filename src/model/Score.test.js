import { describe, expect, it } from 'vitest'

import { createEmptyScore, createScore } from './Score'
import { ScoreMarks, Decoration } from '../data/ScoreLiterals'
import Config from '../data/Config'
import { fromJSON } from '../tools/Persistence'

const note = ScoreMarks.notes.ryo[1]
const decoration = ScoreMarks.decorations.find((item) => item.name === Decoration.LeanTo)

describe('createEmptyScore', () => {
  it('starts with a single empty line and the cursor at the origin', () => {
    const score = createEmptyScore()
    expect(score.isEmpty()).toBe(true)
    expect(score.getLineCount()).toBe(1)
    expect(score.getCurrentLineIndex()).toBe(0)
    expect(score.getCurrentMarkIndex()).toBe(0)
    expect(score.getTitle()).toBe('Untitled')
  })
})

describe('addNote', () => {
  it('advances the cursor', () => {
    const score = createEmptyScore()
    score.addNote(note)
    expect(score.isEmpty()).toBe(false)
    expect(score.getCurrentMarkIndex()).toBe(1)
    expect(score.getLines()[0].marks).toHaveLength(1)
  })

  it('wraps onto a new line when the line is full', () => {
    const score = createEmptyScore()
    for (let i = 0; i <= Config.maxLineLength; ++i) {
      score.addNote(note)
    }
    expect(score.getLineCount()).toBe(2)
    expect(score.getCurrentLineIndex()).toBe(1)
    expect(score.getLines()[0].marks).toHaveLength(Config.maxLineLength)
    expect(score.getLines()[1].marks).toHaveLength(1)
  })

  it('notifies the onEdit hook', () => {
    const score = createEmptyScore()
    let edits = 0
    score.onEdit(() => { edits++ })
    score.addNote(note)
    expect(edits).toBe(1)
  })
})

describe('deleteMark', () => {
  it('removes the mark before the cursor', () => {
    const score = createEmptyScore()
    score.addNote(note)
    score.deleteMark()
    expect(score.isEmpty()).toBe(true)
    expect(score.getCurrentMarkIndex()).toBe(0)
  })

  it('merges lines when deleting across a line boundary', () => {
    const score = createEmptyScore()
    score.addNote(note)
    score.newLine()
    expect(score.getLineCount()).toBe(2)
    expect(score.getCurrentMarkIndex()).toBe(0)

    score.deleteMark()
    expect(score.getLineCount()).toBe(1)
    expect(score.getCurrentLineIndex()).toBe(0)
    expect(score.getCurrentMarkIndex()).toBe(1)
  })
})

describe('serialise round trip', () => {
  it('rebuilds an equivalent score, including decoration Maps', () => {
    const score = createEmptyScore()
    score.setTitle('Round Trip')
    score.addNote(note)
    score.addDecoration(decoration)
    score.addNote(note)

    const revived = createScore(fromJSON(score.serialise()))

    expect(revived.getTitle()).toBe('Round Trip')
    expect(revived.getLineCount()).toBe(score.getLineCount())
    expect(revived.getLines()[0].marks).toHaveLength(2)

    const decorations = revived.getLines()[0].marks[0].decorations
    expect(decorations).toBeInstanceOf(Map)
    expect(decorations.has(Decoration.LeanTo)).toBe(true)
  })
})
