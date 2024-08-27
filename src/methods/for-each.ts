import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { hasOwn } from '../tools/has-own';
import { isObject } from '../tools/is-object';
import { wrapFilterCallback } from '../tools/wrap-callback';
import type { Anything, Extra, ImmutableObject, Key } from '../types/private-types';
import type { ForEachCallback } from '../types/types';

export function forEach<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, K, E, TH>,
  ...extra: E
): void;

export function forEach<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, K, Extra, TH>,
  ...extra: Extra
): void;

export function forEach<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, K, E, TH>,
): void {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw errorNotEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw errorNotObject(object);
  }

  const wrapped = wrapFilterCallback<V, K, E, TH, undefined>(
    callback,
    this,
    object,
    args,
    argsLen,
  );

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      wrapped(key);
    }
  }

}
