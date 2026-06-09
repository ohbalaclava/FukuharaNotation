import { describe, expect, test } from 'vitest'
import { createEmptyScore } from './model/Score'
import { MarkType } from './data/ScoreLiterals'

const note = { type: MarkType.Note, name: '一', glyph: {} }

describe('Score model', () => {
  test('a fresh score is empty with one line', () => {
    const score = createEmptyScore()
    expect(score.isEmpty()).toBe(true)
    expect(score.getLineCount()).toBe(1)
    expect(score.getCurrentMarkIndex()).toBe(0)
  })

  test('adding a note advances the cursor and fills the line', () => {
    const score = createEmptyScore()
    score.addNote(note)
    expect(score.isEmpty()).toBe(false)
    expect(score.getCurrentMarkIndex()).toBe(1)
    expect(score.getLines()[0].marks).toHaveLength(1)
    expect(score.getLines()[0].marks[0].name).toBe('一')
  })

  test('deleting the only note returns the score to empty', () => {
    const score = createEmptyScore()
    score.addNote(note)
    score.deleteMark()
    expect(score.isEmpty()).toBe(true)
    expect(score.getCurrentMarkIndex()).toBe(0)
  })
})