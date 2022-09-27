import { assert } from '../tools/Assertions'

function createState (sto) {
  const validateState = (state) => {
    assert(Object.prototype.hasOwnProperty.call(sto.states, state),
           `State validation error: ${state} is not a valid state`)
  }

  const validateTransition = (transition) => {
    const errorPrefix = 'State transition validation error:'
    assert(typeof transition === 'function', `${errorPrefix} ${transition} is not a function`)
    const parts = transition.name.split('_')
    assert(parts.length >= 3, `${errorPrefix} ${transition.name} must contain 3 parts separated by underscores`)
    assert(parts[0] === 'transition', `${errorPrefix} ${transition.name} must begin with 'transition_'`)

    for (let i = 1; i <= 2; i++) {
      try {
        validateState(parts[i])
      } catch (e) {
        throw new Error(`${errorPrefix} ${parts[i]} is not a valid state in ${transition.name}`)
      }
    }
  }

  validateState(sto.initialState)
  sto.transitions.array.forEach(transition => validateTransition(transition))

  let currentState = sto.initialState

  const to = (newState) => {
    const transitionName = `transition_${currentState}_${newState}`
    if (sto[transitionName]) {
      sto[transitionName]()
      currentState = newState
    } else {
      throw new Error(`State transition error: no transition defined from ${currentState} to ${newState}`)
    }
  }

  return {
    to,
    validateState
  }
}

export { createState }
