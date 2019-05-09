import toArray from "args-to-arr";
import callItBack from "./call-it-back";
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

  const extra = toArray(arguments, 2);
  const result: Record<Key, RV> = {};

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result[key] = callItBack(callback, this, object, key, extra as E);
    }
  }

  return result;

}

export default map;
