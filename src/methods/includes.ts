import type { Anything, ImmutableObject, Key } from '../types/private-types';
import { keyOf } from './key-of';

export function includes(object: ImmutableObject<Key, Anything>, value: Anything): boolean {
  return keyOf(object, value) !== null;
}
