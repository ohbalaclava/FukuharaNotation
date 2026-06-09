import { describe, expect, test, afterEach } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'
import App from './App'

afterEach(cleanup)

// Mounts the whole component tree (react-native-web + react-spring + the JSX
// transform) to prove the migrated app actually executes at runtime, not just
// that it compiles. Catches blank-page-on-mount regressions from RNW/Vite shims.
describe('App rendering', () => {
  test('mounts without throwing and renders the score title input', () => {
    const { container } = render(<App />)
    expect(container.querySelector('div')).not.toBeNull()
    // ScoreTitle renders the default "Untitled" score title as tappable text.
    expect(screen.getByText('Untitled')).toBeInTheDocument()
  })
})