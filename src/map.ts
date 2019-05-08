import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";
import { MapCallback } from "./types";

function map<K extends keyof any, V, E extends any[], N = any>(
  object: Record<K, V>,
  callback: MapCallback<K, V, E, N>,
  ...extra: E
): Record<K, N>;
function map<K extends keyof any, V, E extends any[], N = any>(
  object: Record<K, V>,
  callback: MapCallback<K, V, E, N>,
): Record<K, N> {

  const extra = toArray(arguments, 2);
  const result: Record<keyof any, N> = {};

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result[key] = callItBack(callback, this, object, key, extra);
    }
  }

  return result;

}

export default map;
