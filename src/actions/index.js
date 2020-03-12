function increment(payload) {
  return {
    type: 'INCREMENT',
    payload
  };
}

function decrement(payload) {
  return {
    type: 'DECREMENT',
    payload
  };
}

export { increment, decrement };
