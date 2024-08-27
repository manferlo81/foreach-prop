import { errorIsNot } from '../tools/errors';
import type { Key } from '../types/private-types';

export function create<V, K extends Key>(keys: K[], value: V): Record<K, V>;
export function create<K extends Key>(keys: K[], value?: undefined): Record<K, undefined>;
export function create<V, K extends Key>(keys: K[], value?: V): Record<K, V | undefined> {

  if (!Array.isArray(keys)) throw errorIsNot(keys, 'an array');

  return keys.reduce<Partial<Record<K, V>>>(
    (output, key) => ({ ...output, [key]: value }),
    {},
  ) as Record<K, V | undefined>;

}
