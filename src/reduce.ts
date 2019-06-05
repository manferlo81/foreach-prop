import hasOwn from "./has-own";
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

  const cb = wrapReduceCallback<V, K, E, R, TH>(
    callback,
    arguments,
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
