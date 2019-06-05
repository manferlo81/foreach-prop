import hasOwn from "./has-own";
import { Extra, FilterCallback, Key } from "./types";
import { wrapFilterCallback } from "./wrap-callback";

function find<K extends Key, V, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E, TH>,
  ...extra: E
): V | void;

function find<K extends Key, V, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E, TH>,
): V | void {

  const cb = wrapFilterCallback<K, V, E, TH, any>(
    callback,
    arguments,
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
