import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";
import { FilterCallback } from "./types";

function filter<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>,
  ...extra: E
): Record<K, V>;
function filter<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>
): Record<K, V> {

  const extra = toArray(arguments, 2);
  const result: Record<keyof any, any> = {};

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      callItBack(callback, this, object, key, extra)
    ) {
      result[key] = object[key];
    }
  }

  return result;

}

export default filter;
