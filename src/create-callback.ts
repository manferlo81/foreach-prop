import toArray from "args-to-arr";
import { ImprovedCallback, MapCallback } from "./types";

function createCallback<K extends keyof any, V, E extends any[], TH = any, R = any>(
  callback: MapCallback<K, V, E, TH, R>,
  args: IArguments,
  start: number,
): ImprovedCallback<K, V, TH, R> {

  const extraLen = args.length - start;

  if (extraLen === 0) {
    return (thisArg: TH, object: Record<K, V>, key: K) => callback.call<TH, any, R>(
      thisArg,
      object[key],
      key,
    );
  } else if (extraLen === 1) {
    return (thisArg: TH, object: Record<K, V>, key: K) => callback.call<TH, any, R>(
      thisArg,
      object[key],
      key,
      args[start],
    );
  } else {
    const extra = toArray(args, start) as E;
    return (thisArg: TH, object: Record<K, V>, key: K) => callback.call<TH, any, R>(
      thisArg,
      object[key],
      key,
      ...extra,
    );
  }

}

export default createCallback;
