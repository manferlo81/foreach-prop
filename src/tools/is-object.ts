import type { Anything, Key } from '../types/private-types';

export function isObject(param: unknown): param is Record<Key, Anything> {
  if (!param) return false;
  return typeof param === 'object';
}
