const strings = ['', 'string']
const numbers = [0, 10, -10, NaN, Infinity, -Infinity]
const booleans = [true, false]
const nulls = [null, undefined]

const objects = [
  {},
  Object.create({}),
  Object.create(null),
  [],
]

export const invalidObjects = [
  ...nulls,
  ...strings,
  ...numbers,
  ...booleans,
]

export const invalidCallbacks = [
  ...invalidObjects,
  ...objects,
]

