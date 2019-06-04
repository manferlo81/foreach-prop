import hasOwn from "./has-own";
import { FilterCallback } from "./types";
import { wrapFilterCallback } from "./wrap-callback";

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

  const cb = wrapFilterCallback<K, V, E, TH, any>(
    callback,
    arguments,
  );

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
