const strings = ['', 'string']
const numbers = [0, 10, -10, NaN, Infinity, -Infinity]
const booleans = [true, false]
const nulls = [null, undefined]

const dictionaries = [
  {} as never,
  Object.create({}) as never,
  Object.create(null) as never,
]

const arrays = [
  [],
  [1, 2, 3],
]

export const objects = [
  ...dictionaries,
  ...arrays,
]

export const functions = [
  () => null,
  function () { /* body */ },
]

const primitives = [
  ...nulls,
  ...strings,
  ...numbers,
  ...booleans,
]

export const invalidObjects = [
  ...primitives,
  ...functions,
]

export const invalidCallbacks = [
  ...primitives,
  ...objects,
]

export const invalidArrays = [
  ...invalidObjects,
  ...dictionaries,
]
