import toArray from "args-to-arr";
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

  const thisArg = this;
  const args = arguments;
  const extraLen = args.length - 2;

  if (extraLen === 0) {

    for (const key in object) {
      if (
        hasOwn.call(object, key) &&
        !callback.call<TH, any, any>(thisArg, object[key], key)
      ) {
        return false;
      }
    }

  } else if (extraLen === 1) {

    for (const key in object) {
      if (
        hasOwn.call(object, key) &&
        !callback.call<TH, any, any>(thisArg, object[key], key, args[2])
      ) {
        return false;
      }
    }

  } else {

    const extra = toArray(args, 2) as E;

    for (const key in object) {
      if (
        hasOwn.call(object, key) &&
        !callback.call<TH, any, any>(thisArg, object[key], key, ...extra)
      ) {
        return false;
      }
    }

  }

  return true;

}

export default every;
