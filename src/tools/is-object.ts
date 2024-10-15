import type { Anything, Key } from '../types/private-types';

export function isObject(target: unknown): target is Record<Key, Anything> {
  if (!target) return false;
  return typeof target === 'object';
}
