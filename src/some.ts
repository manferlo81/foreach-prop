import { invalidObject, notEnoughArgs } from "./errors";
import hasOwn from "./has-own";
import isObject from "./is-object";
import { Extra, FilterCallback, Key } from "./types";
import { wrapFilterCallback } from "./wrap-callback";

function some<V, K extends Key, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<V, K, E, TH>,
  ...extra: E
): boolean;

function some<V, K extends Key, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<V, K, Extra, TH>,
  ...extra: Extra
): boolean;

function some<V, K extends Key, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<V, K, E, TH>,
): boolean {

  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
  }

  const cb = wrapFilterCallback<V, K, E, TH, any>(
    callback,
    arguments,
  );

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      cb(this, object, key)
    ) {
      return true;
    }
  }

  return false;

}

export default some;
