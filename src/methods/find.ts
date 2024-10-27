import { createMapEntryCallback } from '../tools/callbacks';
import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { findEntryValue } from '../tools/find-entry';
import { getEntries } from '../tools/object-entries';
import type { PredicateCallbackFromObject } from '../types/callback-types';
import type { EntryTypeFromObject, EntryValueType } from '../types/entry-types';
import type { UnknownArray } from '../types/helper-types';

export function find<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, [], T>,
): EntryValueType<EntryTypeFromObject<O>> | undefined;

export function find<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, X, T>,
  ...extra: X
): EntryValueType<EntryTypeFromObject<O>> | undefined;

export function find<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, UnknownArray, T>,
  ...extra: UnknownArray
): EntryValueType<EntryTypeFromObject<O>> | undefined;

export function find<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, X, T>,
  ...extra: X
): EntryValueType<EntryTypeFromObject<O>> | undefined {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry predicate
  const entryPredicate = createMapEntryCallback(this, predicate, extra);

  // get entries
  const entries = getEntries(object);

  // find value
  return findEntryValue(entries, entryPredicate);

}
