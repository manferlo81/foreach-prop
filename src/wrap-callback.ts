import toArray from 'args-to-arr';
import isFunction from 'is-function';
import { invalidCallback } from './errors';
import {
  Anything,
  Extra,
  FilterCallback,
  Key,
  MapCallback,
  ReduceCallback,
  WrappedFilterCallback,
  WrappedReduceCallback,
} from './types';

export function wrapFilterCallback<V, K extends Key, E extends Extra, TH = Anything, R = Anything>(
  callback: FilterCallback<V, K, E, TH>,
  thisArg: TH,
  object: Record<K, V>,
  args: IArguments,
  argsLen: number,
): WrappedFilterCallback<K, R> {

  if (!isFunction(callback)) {
    throw invalidCallback(callback);
  }

  if (argsLen === 2) {
    return (key: K): R => (callback as MapCallback<V, K, E, TH, R>).call<TH, Anything, R>(
      thisArg,
      object[key],
      key,
    );
  }

  if (argsLen === 3) {
    const extra = args[2] as never;
    return (key: K): R => (callback as MapCallback<V, K, E, TH, R>).call<TH, Anything, R>(
      thisArg,
      object[key],
      key,
      extra,
    );
  }

  const extra = toArray(args, 2) as E;

  return (key: K): R => (callback as MapCallback<V, K, E, TH, R>).call<TH, Anything, R>(
    thisArg,
    object[key],
    key,
    ...extra,
  );

}

export function wrapReduceCallback<V, K extends Key, E extends Extra, R = Anything, TH = Anything>(
  callback: ReduceCallback<V, K, E, TH, R>,
  thisArg: TH,
  object: Record<K, V>,
  args: IArguments,
  argsLen: number,
): WrappedReduceCallback<K, R> {

  if (!isFunction(callback)) {
    throw invalidCallback(callback);
  }

  if (argsLen === 3) {
    return (key: K, result: R | undefined): R => callback.call<TH, Anything, R>(
      thisArg,
      result,
      object[key],
      key,
    );
  }

  if (argsLen === 4) {
    const extra = args[3] as never;
    return (key: K, result: R | undefined): R => callback.call<TH, Anything, R>(
      thisArg,
      result,
      object[key],
      key,
      extra,
    );
  }

  const extra = toArray(args, 3) as E;

  return (key: K, result: R | undefined): R => callback.call<TH, Anything, R>(
    thisArg,
    result,
    object[key],
    key,
    ...extra,
  );

}
