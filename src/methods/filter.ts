import { invalidObject, notEnoughArgs } from '../tools/errors';
import { hasOwn } from '../tools/has-own';
import { isObject } from '../tools/is-object';
import { wrapFilterCallback } from '../tools/wrap-callback';
import type { Anything, Extra, ImmutableObject, Key } from '../types/private-types';
import type { FilterCallback } from '../types/types';

export function filter<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, E, TH>,
  ...extra: E
): Record<K, V>;

export function filter<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, Extra, TH>,
  ...extra: Extra
): Record<K, V>;

export function filter<V, K extends Key, E extends Extra, TH = Anything>(
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

  const wrapped = wrapFilterCallback<V, K, E, TH>(
    callback,
    this,
    object,
    args,
    argsLen,
  );

  const result: Record<Key, Anything> = {};

  for (const key in object) {
    if (
      hasOwn.call(object, key)
      && wrapped(key)
    ) {
      result[key] = object[key];
    }
  }

  return result;

}
