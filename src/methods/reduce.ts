import { invalidObject, notEnoughArgs } from '../tools/errors';
import { hasOwn } from '../tools/has-own';
import { isObject } from '../tools/is-object';
import { wrapReduceCallback } from '../tools/wrap-callback';
import type { Anything, Extra, ImmutableObject, Key } from '../types/private-types';
import type { ReduceCallback } from '../types/types';

export function reduce<V, K extends Key, E extends Extra, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, K, E, TH, R>,
  initial: R,
  ...extra: E
): R;

export function reduce<V, K extends Key, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, K, Extra, TH, R>,
  initial: R,
  ...extra: Extra
): R;

export function reduce<V, K extends Key, E extends Extra, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, K, E, TH, R>,
  initial?: R,
  ...extra: E
): R | undefined;

export function reduce<V, K extends Key, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, K, Extra, TH, R>,
  initial?: R,
  ...extra: Extra
): R | undefined;

export function reduce<V, K extends Key, E extends Extra, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, K, E, TH, R>,
  initial?: R,
): R | undefined {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
  }

  const wrapped = wrapReduceCallback<V, K, E, R, TH>(
    callback,
    this,
    object,
    args,
    argsLen,
  );

  let result = initial;

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result = wrapped(key, result);
    }
  }

  return result;

}
