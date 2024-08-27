import { errorIsNot } from '../tools/errors';
import { fillObject } from '../tools/fill-object';
import type { Key } from '../types/private-types';

export function create<V, K extends Key>(keys: K[], value: V): Record<K, V>;
export function create<K extends Key>(keys: K[], value?: undefined): Record<K, undefined>;
export function create<V, K extends Key>(keys: K[], value?: V): Record<K, V | undefined> {

  // throw if `keys` is not an array
  if (!Array.isArray(keys)) throw errorIsNot(keys, 'an array');

  // return new object
  return fillObject(keys, value);

}
