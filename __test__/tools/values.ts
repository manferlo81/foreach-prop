const strings = ['', 'string'];
const numbers = [0, 10, -10, NaN, Infinity, -Infinity];
const booleans = [true, false];
const nulls = [null, undefined];

const dictionaries = [
  {} as never,
  Object.create({}) as never,
  Object.create(null) as never,
];

const arrays = [
  [],
];

const objects = [
  ...dictionaries,
  ...arrays,
];

export const invalidObjects = [
  ...nulls,
  ...strings,
  ...numbers,
  ...booleans,
];

export const invalidCallbacks = [
  ...invalidObjects,
  ...objects,
];

export const invalidArrays = [
  ...invalidObjects,
  ...dictionaries,
];
