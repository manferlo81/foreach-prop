import createCallback from "./create-callback";
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

  const cb = createCallback(callback, arguments, 2);
  const result: Record<keyof any, any> = {};

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      cb(this, object, key)
    ) {
      result[key] = object[key];
    }
  }

  return result;

}

export default filter;
