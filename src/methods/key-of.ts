import { createFindValueEntryPredicate } from '../tools/callbacks';
import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { findEntryKey } from '../tools/find-entry';
import { getEntries } from '../tools/object-entries';
import type { EntryKeyTypeFromObject } from '../types/entry-types';

export function keyOf<O extends object>(object: O, value: unknown): EntryKeyTypeFromObject<O> | null;
export function keyOf<O extends object>(object: O, value: unknown): EntryKeyTypeFromObject<O> | null {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createFindValueEntryPredicate(value);

  // get object entries
  const entries = getEntries(object);

  // return key if found or null otherwise
  return findEntryKey(entries, entryHandler);

}
