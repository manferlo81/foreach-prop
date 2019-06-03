import toArray from "args-to-arr";
import hasOwn from "./has-own";
import { FilterCallback } from "./types";

function filter<K extends keyof any, V, E extends any[], TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E, TH>,
  ...extra: E
): Record<K, V>;
function filter<K extends keyof any, V, E extends any[], TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E, TH>,
): Record<K, V> {

  const thisArg = this;
  const args = arguments;
  const extraLen = args.length - 2;

  const result: Record<keyof any, any> = {};

  if (extraLen === 0) {

    for (const key in object) {
      if (
        hasOwn.call(object, key) &&
        callback.call<TH, any, any>(thisArg, object[key], key)
      ) {
        result[key] = object[key];
      }
    }

  } else if (extraLen === 1) {

    for (const key in object) {
      if (
        hasOwn.call(object, key) &&
        callback.call<TH, any, any>(thisArg, object[key], key, args[2])
      ) {
        result[key] = object[key];
      }
    }

  } else {

    const extra = toArray(args, 2) as E;

    for (const key in object) {
      if (
        hasOwn.call(object, key) &&
        callback.call<TH, any, any>(thisArg, object[key], key, ...extra)
      ) {
        result[key] = object[key];
      }
    }

  }

  return result;

}

export default filter;
