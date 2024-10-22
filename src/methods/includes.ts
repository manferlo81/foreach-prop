import type { Anything } from '../types/helper-types';
import type { ImmutableObject, Key } from '../types/private-types';

export function includes(object: ImmutableObject<Key, Anything>, value: Anything): boolean {
  return Object.values(object).includes(value);
}
