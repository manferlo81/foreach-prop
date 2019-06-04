import hasOwn from "./has-own";
import { ReduceCallback } from "./types";
import { wrapReduceCallback } from "./wrap-callback";

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

  const cb = wrapReduceCallback(callback, arguments);

  let result = initial;

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result = cb(this, object, key, result);
    }
  }

  return result;

}

export default reduce;
