export function error(msg: string): TypeError {
  return new TypeError(msg);
}

export function notEnoughArgs(count: number, expected: number): TypeError {
  return error(`expected ${expected} arguments, got ${count}.`);
}

export function invalidObject(object: unknown): TypeError {
  return error(`${object} is not an object.`);
}

export function invalidCallback(callback: unknown): TypeError {
  return error(`${callback} is not a function.`);
}
