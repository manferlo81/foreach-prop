import toArray from "args-to-arr";
import hasOwn from "./has-own";
import { ReduceCallback } from "./types";

function reduce<K extends keyof any, V, E extends any[], R = any, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ReduceCallback<K, V, E, R, TH>,
  initial?: R,
  ...extra: E
): R | undefined;
function reduce<K extends keyof any, V, E extends any[], R = any, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ReduceCallback<K, V, E, R, TH>,
  initial?: R,
): R | undefined {

  const extra = toArray(arguments, 3);
  let result = initial;

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result = callback.call<TH, any, R>(this, result, object[key], key, ...extra);
    }
  }

  return result;

}

export default reduce;
