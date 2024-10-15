import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { fillObject } from '../tools/fill-object';
import { isObject } from '../tools/is-object';
import type { Anything, ImmutableObject, Key } from '../types/private-types';

export function fill<V, K extends Key, RV = Anything>(
  object: ImmutableObject<K, V>,
  value: RV,
): Record<K, RV> {

  // throw if not enough arguments
  const argsLen = arguments.length;
  if (argsLen < 2) throw errorNotEnoughArgs(argsLen, 2);

  // throw if not an object
  if (!isObject(object)) throw errorNotObject(object);

  const keys = Object.keys(object) as K[];
  return fillObject(keys, value);

}
