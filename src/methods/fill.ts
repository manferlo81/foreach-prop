import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { fillObject } from '../tools/fill-object';
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

  // get keys from object
  const keys = Object.keys(object) as K[];

  // return new object
  return fillObject(keys, value);

}
