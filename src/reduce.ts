import toArray from "args-to-arr";
import hasOwn from "./has-own";
import { ReduceCallback } from "./types";

function reduce<K extends keyof any, V, E extends any[], T = any>(
  object: Record<K, V>,
  callback: ReduceCallback<K, V, E, T>,
  initial: T,
  ...extra: E
): T;
function reduce<K extends keyof any, V, E extends any[], T = any>(
  object: Record<K, V>,
  callback: ReduceCallback<K, V, E, T>,
  initial: T
): T {

  const extra = toArray(arguments, 3);
  let result = initial;

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result = callback.call(this, result, object[key], key, ...extra);
    }
  }

  return result;

}

export default reduce;
