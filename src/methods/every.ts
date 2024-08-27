import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { hasOwn } from '../tools/has-own';
import { isObject } from '../tools/is-object';
import { wrapFilterCallback } from '../tools/wrap-callback';
import type { Anything, Extra, ImmutableObject, Key } from '../types/private-types';
import type { FilterCallback } from '../types/types';

export function every<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, E, TH>,
  ...extra: E
): boolean;

export function every<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, Extra, TH>,
  ...extra: Extra
): boolean;

export function every<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, E, TH>,
): boolean {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw errorNotEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw errorNotObject(object);
  }

  const wrapped = wrapFilterCallback<V, K, E, TH>(
    callback,
    this,
    object,
    args,
    argsLen,
  );

  for (const key in object) {
    if (
      hasOwn.call(object, key)
      && !wrapped(key)
    ) {
      return false;
    }
  }

  return true;

}
