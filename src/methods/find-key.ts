import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler, findEntryKey } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { EntryKeyType, EntryKeyTypeFromObject, EntryTypeFromObject, Key, KeyAsString } from '../types/entry-types';
import type { Anything } from '../types/helper-types';
import type { Extra, ImmutableObject } from '../types/private-types';
import type { FilterCallback, ResultCallbackFromObject } from '../types/types';

export function findKey<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, unknown, [], T>,
): EntryKeyTypeFromObject<O> | null;

export function findKey<O extends object, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): EntryKeyTypeFromObject<O> | null;

export function findKey<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, unknown, Extra, T>,
  ...extra: Extra
): EntryKeyTypeFromObject<O> | null;

// vvvvvvvv OLD SIGNATURES vvvvvvvv

export function findKey<V, K extends Key, X extends Extra, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, KeyAsString<K>, X, T>,
  ...extra: X
): K | null;

export function findKey<V, K extends Key, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, KeyAsString<K>, Extra, T>,
  ...extra: Extra
): K | null;

export function findKey<O extends object, X extends Extra, T = Anything>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): EntryKeyType<EntryTypeFromObject<O>> | null {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // get entries
  const entries = getEntries(object);

  // find key
  return findEntryKey(entries, entryHandler);

}
