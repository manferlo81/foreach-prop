import toArray from "args-to-arr";
import isFunction from "is-function";
import { invalidCallback } from "./errors";
import {
  Extra,
  FilterCallback,
  Key,
  MapCallback,
  ReduceCallback,
  WrappedFilterCallback,
  WrappedReduceCallback,
} from "./types";

export function wrapFilterCallback<V, K extends Key, E extends Extra, TH = any, R = any>(
  callback: FilterCallback<V, K, E, TH>,
  args: IArguments,
): WrappedFilterCallback<V, K, TH, R> {

  if (!isFunction(callback)) {
    throw invalidCallback(callback);
  }

  const extraLen = args.length - 2;

  return (extraLen === 0)
    ? (thisArg: TH, object: Record<K, V>, key: K) => (callback as MapCallback<V, K, E, TH, R>).call<TH, any, R>(
      thisArg,
      object[key],
      key,
    )
    : (extraLen === 1)
      ? (thisArg: TH, object: Record<K, V>, key: K) => (callback as MapCallback<V, K, E, TH, R>).call<TH, any, R>(
        thisArg,
        object[key],
        key,
        args[2],
      )
      : (thisArg: TH, object: Record<K, V>, key: K) => (callback as MapCallback<V, K, E, TH, R>).call<TH, any, R>(
        thisArg,
        object[key],
        key,
        ...toArray(args, 2) as E,
      );

}

export function wrapReduceCallback<V, K extends Key, E extends Extra, R = any, TH = any>(
  callback: ReduceCallback<V, K, E, TH, R>,
  args: IArguments,
): WrappedReduceCallback<V, K, TH, R> {

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
