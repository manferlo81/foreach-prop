import type { EntryValueTypeFromObject } from '../types/entry-types';

export function includes<O extends object>(object: O, value: EntryValueTypeFromObject<O>): boolean;
export function includes(object: object, value: unknown): boolean;

export function includes(object: object, value: unknown): boolean {
  const values = Object.values(object) as unknown[];
  return values.includes(value);
}
