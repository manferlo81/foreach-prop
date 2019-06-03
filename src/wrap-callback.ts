import toArray from "args-to-arr";
import isFunction from "is-function";
import { invalidCallback } from "./errors";
import { FilterCallback, ImprovedCallback, MapCallback, ReduceCallback } from "./types";

export function wrapFilterCallback<K extends keyof any, V, E extends any[], TH = any, R = any>(
  callback: FilterCallback<K, V, E, TH>,
  args: IArguments,
): ImprovedCallback<K, V, TH, R> {

  if (!isFunction(callback)) {
    throw invalidCallback(callback);
  }

  const extraLen = args.length - 2;

  return (extraLen === 0)
    ? (thisArg: TH, object: Record<K, V>, key: K) => (callback as MapCallback<K, V, E, TH, R>).call<TH, any, R>(
      thisArg,
      object[key],
      key,
    )
    : (extraLen === 1)
      ? (thisArg: TH, object: Record<K, V>, key: K) => (callback as MapCallback<K, V, E, TH, R>).call<TH, any, R>(
        thisArg,
        object[key],
        key,
        args[2],
      )
      : (thisArg: TH, object: Record<K, V>, key: K) => (callback as MapCallback<K, V, E, TH, R>).call<TH, any, R>(
        thisArg,
        object[key],
        key,
        ...toArray(args, 2) as E,
      );

}

export function wrapReduceCallback<K extends keyof any, V, E extends any[], R = any, TH = any>(
  callback: ReduceCallback<K, V, E, R, TH>,
  args: IArguments,
) {

  if (!isFunction(callback)) {
    throw invalidCallback(callback);
  }

  const extraLen = args.length - 3;

  return (extraLen === 0)
    ? (thisArg: TH, object: Record<K, V>, key: K, result: R | undefined) => callback.call<TH, any, R>(
      thisArg,
      result,
      object[key],
      key,
    )
    : (extraLen === 1)
      ? (thisArg: TH, object: Record<K, V>, key: K, result: R | undefined) => callback.call<TH, any, R>(
        thisArg,
        result,
        object[key],
        key,
        args[3],
      )
      : (thisArg: TH, object: Record<K, V>, key: K, result: R | undefined) => callback.call<TH, any, R>(
        thisArg,
        result,
        object[key],
        key,
        ...toArray(args, 3) as E,
      );

}
