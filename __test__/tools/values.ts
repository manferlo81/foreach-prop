const strings = ['', 'string'];
const numbers = [0, 10, -10, NaN, Infinity, -Infinity];
const booleans = [true, false];
const nulls = [null, undefined];

const objects: Array<Record<string | number, never>> = [
  {} as never,
  Object.create({}) as never,
  Object.create(null) as never,
  [] as never,
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
