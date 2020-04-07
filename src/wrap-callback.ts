import toArray from 'args-to-arr';
import isFunction from 'is-function';
import { invalidCallback } from './errors';
import {
  Extra,
  FilterCallback,
  Key,
  MapCallback,
  ReduceCallback,
  WrappedFilterCallback,
  WrappedReduceCallback,
} from './types';

export function wrapFilterCallback<V, K extends Key, E extends Extra, TH = any, R = any>(
  callback: FilterCallback<V, K, E, TH>,
  thisArg: TH,
  object: Record<K, V>,
  args: IArguments,
  argsLen: number,
): WrappedFilterCallback<K, R> {

  if (!isFunction(callback)) {
    throw invalidCallback(callback);
  }

  return (argsLen === 2)
    ? (key: K): R => (callback as MapCallback<V, K, E, TH, R>).call<TH, any, R>(
      thisArg,
      object[key],
      key,
    )
    : (argsLen === 3)
      ? (key: K): R => (callback as MapCallback<V, K, E, TH, R>).call<TH, any, R>(
        thisArg,
        object[key],
        key,
        args[2],
      )
      : (key: K): R => (callback as MapCallback<V, K, E, TH, R>).call<TH, any, R>(
        thisArg,
        object[key],
        key,
        ...toArray(args, 2) as E,
      );

}

export function wrapReduceCallback<V, K extends Key, E extends Extra, R = any, TH = any>(
  callback: ReduceCallback<V, K, E, TH, R>,
  thisArg: TH,
  object: Record<K, V>,
  args: IArguments,
  argsLen: number,
): WrappedReduceCallback<K, R> {

  if (!isFunction(callback)) {
    throw invalidCallback(callback);
  }

  return (argsLen === 3)
    ? (key: K, result: R | undefined): R => callback.call<TH, any, R>(
      thisArg,
      result,
      object[key],
      key,
    )
    : (argsLen === 4)
      ? (key: K, result: R | undefined): R => callback.call<TH, any, R>(
        thisArg,
        result,
        object[key],
        key,
        args[3],
      )
      : (key: K, result: R | undefined): R => callback.call<TH, any, R>(
        thisArg,
        result,
        object[key],
        key,
        ...toArray(args, 3) as E,
      );

}
