export function notEnoughArgs(count: number, expected: number): TypeError {
  return new TypeError(`expected ${expected} arguments, got ${count}.`);
}

export function invalidObject(object: unknown): TypeError {
  return new TypeError(`${object} is not an object.`);
}

export function invalidCallback(callback: unknown): TypeError {
  return new TypeError(`${callback} is not a function.`);
}
