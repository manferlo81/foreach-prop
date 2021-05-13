import { invalidObject, notEnoughArgs } from './errors';
import hasOwn from './has-own';
import isObject from './is-object';
import { Anything, Extra, Key, MapCallback } from './types';
import { wrapFilterCallback } from './wrap-callback';

function map<V, K extends Key, E extends Extra, RV = Anything, TH = Anything>(
  this: TH,
  object: Record<K, V>,
  callback: MapCallback<V, K, E, TH, RV>,
  ...extra: E
): Record<K, RV>;

function map<V, K extends Key, RV = Anything, TH = Anything>(
  this: TH,
  object: Record<K, V>,
  callback: MapCallback<V, K, Extra, TH, RV>,
  ...extra: Extra
): Record<K, RV>;

function map<V, K extends Key, E extends Extra, RV = Anything, TH = Anything>(
  this: TH,
  object: Record<K, V>,
  callback: MapCallback<V, K, E, TH, RV>,
): Record<K, RV> {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
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

export default map;
