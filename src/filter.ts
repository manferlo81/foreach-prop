import toArray from "args-to-arr";
import callItBack from "./call-it-back";
import hasOwn from "./has-own";
import { FilterCallback } from "./types";

function filter<K extends keyof any, V, E extends any[]>(
  this: any,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>,
  ...extra: E
): Record<K, V>;
function filter<K extends keyof any, V, E extends any[]>(
  this: any,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>,
): Record<K, V> {

  const extra = toArray(arguments, 2);
  const result: Record<keyof any, any> = {};

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      callItBack(callback, this, object, key, extra as E)
    ) {
      result[key] = object[key];
    }
  }

  return result;

}

export default filter;
