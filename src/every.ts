import toArray from "args-to-arr";
import callItBack from "./call-it-back";
import hasOwn from "./has-own";
import { Extra, FilterCallback, Key } from "./types";

function every<K extends Key, V, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E, TH>,
  ...extra: E
): boolean;
function every<K extends Key, V, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<K, V, E, TH>,
): boolean {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      !callItBack(callback, this, object, key, extra as E)
    ) {
      return false;
    }
  }

  return true;

}

export default every;
