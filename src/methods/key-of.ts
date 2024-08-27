import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { hasOwn } from '../tools/has-own';
import { isObject } from '../tools/is-object';
import type { Anything, ImmutableObject, Key } from '../types/private-types';

export function keyOf<K extends Key>(object: ImmutableObject<K, Anything>, value: Anything): K | null {

  const argsLen = arguments.length;

  if (argsLen < 2) {
    throw errorNotEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw errorNotObject(object);
  }

  for (const key in object) {
    if (
      hasOwn.call(object, key)
      && object[key] === value
    ) {
      return key as K;
    }
  }

  return null;

}
