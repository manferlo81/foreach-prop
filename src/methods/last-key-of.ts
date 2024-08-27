import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { hasOwn } from '../tools/has-own';
import { isObject } from '../tools/is-object';
import type { Anything, ImmutableObject, Key } from '../types/private-types';

export function lastKeyOf<K extends Key>(object: ImmutableObject<K, Anything>, value: Anything): K | null {

  const argsLen = arguments.length;

  if (argsLen < 2) {
    throw errorNotEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw errorNotObject(object);
  }

  let result: K | null = null;

  for (const key in object) {
    if (
      hasOwn.call(object, key)
      && object[key] === value
    ) {
      result = key as K;
    }
  }

  return result;

}
