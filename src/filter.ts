import { invalidObject, notEnoughArgs } from './errors';
import hasOwn from './has-own';
import isObject from './is-object';
import { Anything, Extra, FilterCallback, ImmutableObject, Key } from './types';
import { wrapFilterCallback } from './wrap-callback';

function filter<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, E, TH>,
  ...extra: E
): Record<K, V>;

function filter<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, Extra, TH>,
  ...extra: Extra
): Record<K, V>;

function filter<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, E, TH>,
): Record<K, V> {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
  }

  const wrapped = wrapFilterCallback<V, K, E, TH, Anything>(
    callback,
    this,
    object,
    args,
    argsLen,
  );

  const result: Record<Key, Anything> = {};

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      wrapped(key)
    ) {
      result[key] = object[key];
    }
  }

  return result;

}

export default filter;
