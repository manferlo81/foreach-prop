import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { hasOwn } from '../tools/has-own';
import { isObject } from '../tools/is-object';
import type { Anything, ImmutableObject, Key } from '../types/private-types';

export function fill<V, K extends Key, RV = Anything>(
  object: ImmutableObject<K, V>,
  value: RV,
): Record<K, RV> {

  // eslint-disable-next-line prefer-rest-params
  const { length: argsLen } = arguments;

  if (argsLen < 2) {
    throw errorNotEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw errorNotObject(object);
  }

  const result: Record<Key, RV> = {};

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result[key as Key] = value;
    }
  }

  return result;

}
