import hasOwn from "./has-own";
import { FilterCallback } from "./types";
import { wrapFilterCallback } from "./wrap-callback";

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

  const cb = wrapFilterCallback<K, V, E, TH, any>(
    callback,
    arguments,
  );

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      cb(this, object, key)
    ) {
      return key;
    }
  }

  return null;

}

export default findKey;
