import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";
import { FilterCallback } from "./types";

function findKey<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>,
  ...extra: E
): K | null;
function findKey<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>
): K | null {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      callItBack(callback, this, object, key, extra)
    ) {
      return key;
    }
  }

  return null;

}

export default findKey;
