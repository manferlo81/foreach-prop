import hasOwn from "./has-own";

function keyOf<K extends keyof any, V>(
  object: Record<K, V>,
  value: V,
): K | null {

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      object[key] === value
    ) {
      return key;
    }
  }

  return null;

}

export default keyOf;
