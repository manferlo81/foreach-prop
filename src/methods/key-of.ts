import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
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

  const keys = Object.keys(object) as K[];
  const values = keys.map((key) => object[key] as unknown);
  const valueIndex = values.indexOf(value);

  if (valueIndex === -1) return null;

  return keys[valueIndex];

}
