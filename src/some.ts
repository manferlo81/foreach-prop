import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";
import { FilterCallback } from "./types";

function some<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>,
  ...extra: E
): boolean;
function some<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>
): boolean {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      callItBack(callback, this, object, key, extra)
    ) {
      return true;
    }
  }

  return false;

}

export default some;
