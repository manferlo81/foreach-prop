export function error(msg: string) {
  return new TypeError(msg);
}

export function notEnoughArgs(count: number, expected: number) {
  return error(`expected ${expected} arguments, got ${count}.`);
}

export function invalidObject(object: unknown) {
  return error(`${object} is not an object.`);
}

export function invalidCallback(callback: unknown) {
  return error(`${callback} is not a function.`);
}
