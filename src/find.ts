import createCallback from "./create-callback";
import hasOwn from "./has-own";
import { FilterCallback } from "./types";

function find<K extends keyof any, V, E extends any[], TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E, TH>,
  ...extra: E
): V | void;
function find<K extends keyof any, V, E extends any[], TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: unknown,
): V | void {

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
      return object[key];
    }
  }

}

export default find;
