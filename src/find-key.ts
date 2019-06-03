import toArray from "args-to-arr";
import hasOwn from "./has-own";
import { FilterCallback } from "./types";

function findKey<K extends keyof any, V, E extends any[], TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E, TH>,
  ...extra: E
): K | null;
function findKey<K extends keyof any, V, E extends any[], TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E, TH>,
): K | null {

  const args = arguments;
  const extraLen = args.length - 2;

  if (extraLen === 0) {

    for (const key in object) {
      if (
        hasOwn.call(object, key) &&
        callback.call<TH, any, any>(this, object[key], key)
      ) {
        return key;
      }
    }

  } else if (extraLen === 1) {

    for (const key in object) {
      if (
        hasOwn.call(object, key) &&
        callback.call<TH, any, any>(this, object[key], key, args[2])
      ) {
        return key;
      }
    }

  } else {

    const extra = toArray(args, 2) as E;

    for (const key in object) {
      if (
        hasOwn.call(object, key) &&
        callback.call<TH, any, any>(this, object[key], key, ...extra)
      ) {
        return key;
      }
    }

  }

  return null;

}

export default findKey;
