import toArray from "args-to-arr";
import callItBack from "./call-it-back";
import hasOwn from "./has-own";
import { FilterCallback } from "./types";

function some<K extends keyof any, V, E extends any[]>(
  this: any,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>,
  ...extra: E
): boolean;
function some<K extends keyof any, V, E extends any[]>(
  this: any,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>,
): boolean {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      callItBack(callback, this, object, key, extra as E)
    ) {
      return true;
    }
  }

  return false;

}

export default some;
