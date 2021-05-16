import { invalidArray } from './errors';
import { Key } from './types';

export function create<V, K extends Key>(keys: K[], value: V): Record<K, V>;
export function create<K extends Key>(keys: K[], value?: undefined): Record<K, undefined>;
export function create<V, K extends Key>(keys: K[], value?: V): Record<K, V | undefined> {

  if (!Array.isArray(keys)) {
    throw invalidArray(keys);
  }

  const result: Record<Key, V | undefined> = {};
  for (const key of keys) {
    result[key] = value;
  }
  return result;
}
