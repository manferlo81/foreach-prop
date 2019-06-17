import { invalidObject, notEnoughArgs } from "./errors";
import hasOwn from "./has-own";
import isObject from "./is-object";
import { Extra, Key, ReduceCallback } from "./types";
import { wrapReduceCallback } from "./wrap-callback";

function reduce<V, K extends Key, E extends Extra, R = any, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ReduceCallback<V, K, E, TH, R>,
  initial: R,
  ...extra: E
): R;

function reduce<V, K extends Key, R = any, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ReduceCallback<V, K, Extra, TH, R>,
  initial: R,
  ...extra: Extra
): R;

function reduce<V, K extends Key, E extends Extra, R = any, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ReduceCallback<V, K, E, TH, R>,
  initial?: R,
  ...extra: E
): R | undefined;

function reduce<V, K extends Key, R = any, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ReduceCallback<V, K, Extra, TH, R>,
  initial?: R,
  ...extra: Extra
): R | undefined;

function reduce<V, K extends Key, E extends Extra, R = any, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ReduceCallback<V, K, E, TH, R>,
  initial?: R,
): R | undefined {

  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
  }

  const cb = wrapReduceCallback<V, K, E, R, TH>(
    callback,
    args,
    argsLen,
  );

  let result = initial;

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result = cb(this, object, key, result);
    }
  }

  return result;

}

export default reduce;
