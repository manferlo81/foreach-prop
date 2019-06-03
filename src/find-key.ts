import createCallback from "./create-callback";
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
  callback: unknown,
): K | null {

  const cb = createCallback<K, V, E, TH, any>(
    callback,
    arguments,
    2,
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
