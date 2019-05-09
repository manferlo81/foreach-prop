import { Extra, FilterCallback, Key } from "./types";

function callItBack<K extends Key, V, E extends Extra, TH>(
  callback: FilterCallback<K, V, E, TH>,
  thisArg: TH,
  object: Record<K, V>,
  key: K,
  extra: E,
): any {
  return callback.call<TH, any, any>(
    thisArg,
    object[key],
    key,
    ...extra,
  );
}

export default callItBack;
