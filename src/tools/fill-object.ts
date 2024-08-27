import { Key } from '../types/private-types';

export function fillObject<K extends Key, V>(keys: K[], value: V) {
  return keys.reduce<Partial<Record<K, V>>>(
    (output, key) => ({ ...output, [key]: value }),
    {},
  ) as Record<K, V>;
}
