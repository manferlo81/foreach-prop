export function invalidCallback(callback: any) {
  return new TypeError(`${callback} is not a function.`);
}
