import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler, findEntryValue } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { EntryTypeFromObject, EntryValueType, Key, KeyAsString } from '../types/entry-types';
import type { Anything } from '../types/helper-types';
import type { Extra, ImmutableObject } from '../types/private-types';
import type { FilterCallback, MapCallbackFromObject } from '../types/types';

export function find<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, unknown, [], T>,
): EntryValueType<EntryTypeFromObject<O>> | undefined;

export function find<O extends object, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): EntryValueType<EntryTypeFromObject<O>> | undefined;

export function find<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, unknown, Extra, T>,
  ...extra: Extra
): EntryValueType<EntryTypeFromObject<O>> | undefined;

// vvvvvvvv OLD SIGNATURES vvvvvvvv

export function find<V, K extends Key, X extends Extra, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, KeyAsString<K>, X, T>,
  ...extra: X
): V | undefined;

export function find<V, K extends Key, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, KeyAsString<K>, Extra, T>,
  ...extra: Extra
): V | undefined;

export function find<O extends object, X extends Extra, T = Anything>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): EntryValueType<EntryTypeFromObject<O>> | undefined {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // get entries
  const entries = getEntries(object);

  // find value
  return findEntryValue(entries, entryHandler);

}
