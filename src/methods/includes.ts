import type { EntryValueTypeFromObject, Key } from '../types/entry-types';
import type { Anything } from '../types/helper-types';
import type { ImmutableObject } from '../types/private-types';

export function includes<O extends object>(object: O, value: EntryValueTypeFromObject<O>): boolean;
export function includes(object: object, value: unknown): boolean;

// vvvvvvvv OLD SIGNATURES vvvvvvvv

export function includes(object: ImmutableObject<Key, Anything>, value: Anything): boolean;

export function includes(object: object, value: unknown): boolean {
  const values = Object.values(object) as unknown[];
  return values.includes(value);
}
