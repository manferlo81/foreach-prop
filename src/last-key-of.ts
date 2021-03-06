import { invalidObject, notEnoughArgs } from './errors';
import hasOwn from './has-own';
import isObject from './is-object';
import { Anything, ImmutableObject, Key } from './types';

function lastKeyOf<K extends Key>(object: ImmutableObject<K, Anything>, value: Anything): K | null {

  const argsLen = arguments.length;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
  }

  let result: K | null = null;

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      object[key] === value
    ) {
      result = key as K;
    }
  }

  return result;

}

export default lastKeyOf;
