import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";
import { FilterCallback } from "./types";

function find<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>,
  ...extra: E
): V | void;
function find<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: FilterCallback<K, V, E>
): V | void {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      callItBack(callback, this, object, key, extra)
    ) {
      return object[key];
    }
  }

}

export default find;
