import { invalidObject, notEnoughArgs } from './errors';
import hasOwn from './has-own';
import isObject from './is-object';
import { Key } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function keyOf<K extends Key>(object: Record<K, any>, value: any): K | null {

  const argsLen = arguments.length;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
  }

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      object[key] === value
    ) {
      return key as K;
    }
  }

  return null;

}

export default keyOf;
