import { createMapEntryCallback } from '../tools/callbacks';
import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { findEntryKey } from '../tools/find-entry';
import { getEntries } from '../tools/object-entries';
import type { EntryKeyType, EntryKeyTypeFromObject, EntryTypeFromObject } from '../types/entry-types';
import type { UnknownArray } from '../types/helper-types';
import type { MapCallbackFromObject } from '../types/types';

export function findKey<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: MapCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): EntryKeyTypeFromObject<O> | null;

export function findKey<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: MapCallbackFromObject<O, unknown, UnknownArray, T>,
  ...extra: UnknownArray
): EntryKeyTypeFromObject<O> | null;

export function findKey<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: MapCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): EntryKeyType<EntryTypeFromObject<O>> | null {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryPredicate = createMapEntryCallback(this, predicate, extra);

  // get entries
  const entries = getEntries(object);

  // find key
  return findEntryKey(entries, entryPredicate);

}
