import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler, findEntryValue } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { EntryTypeFromObject, EntryValueType } from '../types/entry-types';
import type { Extra } from '../types/private-types';
import type { MapCallbackFromObject } from '../types/types';

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

export function find<O extends object, X extends Extra, T = unknown>(
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
