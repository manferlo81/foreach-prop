import createCallback from "./create-callback";
import hasOwn from "./has-own";
import { Key, MapCallback } from "./types";

function map<K extends keyof any, V, E extends any[], RV = any, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: MapCallback<K, V, E, TH, RV>,
  ...extra: E
): Record<K, RV>;
function map<K extends keyof any, V, E extends any[], RV = any, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: MapCallback<K, V, E, TH, RV>,
): Record<K, RV> {

  const cb = createCallback(callback, arguments, 2);

  const result: Record<Key, RV> = {};

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result[key] = cb(this, object, key) as any;
    }
  }

  return result;

}

export default map;
