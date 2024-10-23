import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { fromEntries, getEntries } from '../tools/object-entries';
import type { EntryTypeFromObject, Key, KeyAsString, ObjectTypeFromEntry } from '../types/entry-types';
import type { Anything } from '../types/helper-types';
import type { Extra, ImmutableObject } from '../types/private-types';
import type { FilterCallback, ResultCallbackFromObject } from '../types/types';

export function filter<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, unknown, [], T>,
): Partial<ObjectTypeFromEntry<EntryTypeFromObject<O>>>;

export function filter<O extends object, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): Partial<ObjectTypeFromEntry<EntryTypeFromObject<O>>>;

export function filter<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, unknown, Extra, T>,
  ...extra: Extra
): Partial<ObjectTypeFromEntry<EntryTypeFromObject<O>>>;

// vvvvvvvv OLD SIGNATURES vvvvvvvv

export function filter<V, K extends Key, X extends Extra, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, KeyAsString<K>, X, T>,
  ...extra: X
): Record<K, V>;

export function filter<V, K extends Key, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, KeyAsString<K>, Extra, T>,
  ...extra: Extra
): Record<K, V>;

export function filter<O extends object, X extends Extra, T = Anything>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): ObjectTypeFromEntry<EntryTypeFromObject<O>> {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // filter entries
  const entries = getEntries(object).filter(entryHandler);

  // return new object from filtered entries
  return fromEntries(entries);

}
