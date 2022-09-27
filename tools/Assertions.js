
function assert (expression, message) {
  if (!expression) {
    throw new Error(message)
  }
}

export { assert }
