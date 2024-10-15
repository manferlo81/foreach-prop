import type { Anything, ImmutableObject, Key } from '../types/private-types';

export function includes(object: ImmutableObject<Key, Anything>, value: Anything): boolean {
  return Object.values(object).includes(value);
}
