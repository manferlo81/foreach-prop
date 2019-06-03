import createCallback from "./create-callback";
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
  callback: unknown,
): boolean {

  const cb = createCallback<K, V, E, TH, any>(
    callback,
    arguments,
    2,
  );

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      !cb(this, object, key)
    ) {
      return false;
    }
  }

  return true;

}

export default every;
