import createCallback from "./create-callback";
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

  const cb = createCallback(callback, arguments, 2);

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      cb(this, object, key);
    }
  }

}

export default forEach;
