import type { Anything, Key } from '../types/private-types';

export function isObject<K extends Key = Key, V = Anything>(param: unknown): param is Record<K, V> {
  return !!param && typeof param === 'object';
}
