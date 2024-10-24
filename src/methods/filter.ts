import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { fromEntries, getEntries } from '../tools/object-entries';
import type { EntryTypeFromObject, ObjectTypeFromEntry } from '../types/entry-types';
import type { Extra } from '../types/private-types';
import type { MapCallbackFromObject } from '../types/types';

type FilteredObject<O extends object> = Partial<ObjectTypeFromEntry<EntryTypeFromObject<O>>>;

export function filter<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, unknown, [], T>,
): FilteredObject<O>;

export function filter<O extends object, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): FilteredObject<O>;

export function filter<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, unknown, Extra, T>,
  ...extra: Extra
): FilteredObject<O>;

export function filter<O extends object, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): FilteredObject<O> {

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
