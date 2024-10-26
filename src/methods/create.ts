import { createObject } from '../tools/create-object';
import { errorIsNot } from '../tools/errors';
import type { Key, ObjectTypeFromValueKey } from '../types/entry-types';

export function create<K extends Key>(keys: readonly K[], value?: undefined): ObjectTypeFromValueKey<undefined, K>;
export function create<V, K extends Key>(keys: readonly K[], value: V): ObjectTypeFromValueKey<V, K>;
export function create<V, K extends Key>(keys: readonly K[], value?: V): ObjectTypeFromValueKey<V | undefined, K> {

  // throw if `keys` is not an array
  if (!Array.isArray(keys)) throw errorIsNot(keys, 'an array');

  // return new object
  return createObject(keys as readonly K[], value);

}
