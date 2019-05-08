import { FilterCallback } from "./types";

function callItBack<K extends keyof any, V, E extends any[]>(
  callback: FilterCallback<K, V, E>,
  thisArg: any,
  object: Record<K, V>,
  key: K,
  extra: E
): any {
  return callback.call(
    thisArg,
    object[key],
    key,
    ...extra
  );
}

export default callItBack;
