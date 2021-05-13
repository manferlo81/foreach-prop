import { invalidObject, notEnoughArgs } from './errors';
import hasOwn from './has-own';
import isObject from './is-object';
import { Anything, Key } from './types';

function fill<V, K extends Key, RV = Anything>(
  object: Record<K, V>,
  value: RV,
): Record<K, RV> {

  // eslint-disable-next-line prefer-rest-params
  const { length: argsLen } = arguments;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
  }

  const result: Record<Key, RV> = {};

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result[key as Key] = value;
    }
  }

  return result;

}

export default fill;
