import hasOwn from "./has-own";
import { Key } from "./types";

function keyOf<K extends Key>(
  object: Record<K, any>,
  value: any,
): K | null {

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      object[key] === value
    ) {
      return key as K;
    }
  }

  return null;

}

export default keyOf;
