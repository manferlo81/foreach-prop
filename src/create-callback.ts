import toArray from "args-to-arr";
import isFunction from "is-function";
import { ImprovedCallback, MapCallback } from "./types";

function createCallback<K extends keyof any, V, E extends any[], TH = any, R = any>(
  callback: unknown,
  args: IArguments,
  start: number,
): ImprovedCallback<K, V, TH, R> {

  if (!isFunction(callback)) {
    throw new TypeError(`${callback} is not a function.`);
  }

  const extraLen = args.length - start;

  if (extraLen === 0) {

    return (thisArg: TH, object: Record<K, V>, key: K) => (callback as MapCallback<K, V, E, TH, R>).call<TH, any, R>(
      thisArg,
      object[key],
      key,
    );

  } else if (extraLen === 1) {

    return (thisArg: TH, object: Record<K, V>, key: K) => (callback as MapCallback<K, V, E, TH, R>).call<TH, any, R>(
      thisArg,
      object[key],
      key,
      args[start],
    );

  } else {

    const extra = toArray(args, start) as E;

    return (thisArg: TH, object: Record<K, V>, key: K) => (callback as MapCallback<K, V, E, TH, R>).call<TH, any, R>(
      thisArg,
      object[key],
      key,
      ...extra,
    );

  }

}

export default createCallback;
