import { createObject } from '../tools/create-object';
import { errorIsNot } from '../tools/errors';
import type { Key, KeyAsString, ObjectTypeFromEntry, ReadonlyEntry } from '../types/entry-types';

export function create<K extends Key>(keys: readonly K[], value?: undefined): ObjectTypeFromEntry<ReadonlyEntry<undefined, KeyAsString<K>>>;
export function create<V, K extends Key>(keys: readonly K[], value: V): ObjectTypeFromEntry<ReadonlyEntry<V, KeyAsString<K>>>;
export function create<V, K extends Key>(keys: readonly K[], value?: V): ObjectTypeFromEntry<ReadonlyEntry<V | undefined, KeyAsString<K>>> {

  // throw if `keys` is not an array
  if (!Array.isArray(keys)) throw errorIsNot(keys, 'an array');

  // return new object
  return createObject(keys, value);

}
