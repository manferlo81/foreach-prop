import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createFindValueEntryHandler, findEntryKey } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { EntryKeyTypeFromObject, Key } from '../types/entry-types';
import type { Anything } from '../types/helper-types';
import type { ImmutableObject } from '../types/private-types';

export function lastKeyOf<O extends object>(object: O, value: unknown): EntryKeyTypeFromObject<O> | null;

// vvvvvvvv OLD SIGNATURES vvvvvvvv

export function lastKeyOf<K extends Key>(object: ImmutableObject<K, Anything>, value: Anything): K | null;

export function lastKeyOf<O extends object>(object: O, value: unknown): EntryKeyTypeFromObject<O> | null {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createFindValueEntryHandler(value);

  // get object entries in reverse order
  const entries = getEntries(object).reverse();

  // return key if found or null otherwise
  return findEntryKey(entries, entryHandler);

}
