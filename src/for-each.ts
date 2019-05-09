import toArray from "args-to-arr";
import callItBack from "./call-it-back";
import hasOwn from "./has-own";
import { Extra, ForEachCallback, Key } from "./types";

function forEach<K extends Key, V, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ForEachCallback<K, V, E, TH>,
  ...extra: E
): void;
function forEach<K extends Key, V, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: ForEachCallback<K, V, E, TH>,
): void {

  const extra = toArray(arguments, 2) as E;

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      callItBack(callback, this, object, key, extra);
    }
  }

}

export default forEach;
