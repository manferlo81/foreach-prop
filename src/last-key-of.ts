import hasOwn from "./has-own";
import { Key } from "./types";

function lastKeyOf<K extends Key>(
  object: Record<K, any>,
  value: any,
): K | null {

  let result: K | null = null;

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      object[key] === value
    ) {
      result = key;
    }
  }

  return result;

}

export default lastKeyOf;
