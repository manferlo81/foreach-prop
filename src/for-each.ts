import hasOwn from "./has-own";
import { Extra, ForEachCallback, Key } from "./types";
import { wrapFilterCallback } from "./wrap-callback";

function forEach<V, K extends Key, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ForEachCallback<V, K, E, TH>,
  ...extra: E
): void;

function forEach<V, K extends Key, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ForEachCallback<V, K, Extra, TH>,
  ...extra: Extra
): void;

function forEach<V, K extends Key, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ForEachCallback<V, K, E, TH>,
): void {

  const cb = wrapFilterCallback<V, K, E, TH, void>(
    callback,
    arguments,
  );

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      cb(this, object, key);
    }
  }

}

export default forEach;
