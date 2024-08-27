import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { hasOwn } from '../tools/has-own';
import { isObject } from '../tools/is-object';
import { wrapFilterCallback } from '../tools/wrap-callback';
import type { Anything, Extra, Key } from '../types/private-types';
import type { MapCallback } from '../types/types';

export function map<V, K extends Key, E extends Extra, RV = Anything, TH = Anything>(
  this: TH,
  object: Record<K, V>,
  callback: MapCallback<V, K, E, TH, RV>,
  ...extra: E
): Record<K, RV>;

export function map<V, K extends Key, RV = Anything, TH = Anything>(
  this: TH,
  object: Record<K, V>,
  callback: MapCallback<V, K, Extra, TH, RV>,
  ...extra: Extra
): Record<K, RV>;

export function map<V, K extends Key, E extends Extra, RV = Anything, TH = Anything>(
  this: TH,
  object: Record<K, V>,
  callback: MapCallback<V, K, E, TH, RV>,
): Record<K, RV> {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw errorNotEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw errorNotObject(object);
  }

  const wrapped = wrapFilterCallback<V, K, E, TH, RV>(
    callback,
    this,
    object,
    args,
    argsLen,
  );

  const result: Record<Key, RV> = {};

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result[key as Key] = wrapped(key);
    }
  }

  return result;

}
