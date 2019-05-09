import keyOf from "./key-of";

function includes<K extends keyof any, V>(
  object: Record<K, V>,
  value: V,
): boolean {
  return keyOf(object, value) !== null;
}

export default includes;
