import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { fromEntries, getEntries } from '../tools/object-entries';
import type { MapEntryValueFromObject, ObjectTypeFromEntry, ResultEntryCallbackFromObject } from '../types/entry-types';
import type { Extra } from '../types/private-types';
import type { MapCallbackFromObject } from '../types/types';

type MappedObject<O extends object, V> = ObjectTypeFromEntry<MapEntryValueFromObject<O, V>>;

export function map<O extends object, V, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, [], T>,
): MappedObject<O, V>;

export function map<O extends object, V, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, X, T>,
  ...extra: X
): MappedObject<O, V>;

export function map<O extends object, V, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, Extra, T>,
  ...extra: Extra
): MappedObject<O, V>;

export function map<O extends object, X extends Extra, V, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, X, T>,
  ...extra: X
): MappedObject<O, V> {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryToValue = createResultEntryHandler(this, callback, extra);

  const entryHandler: ResultEntryCallbackFromObject<O, MapEntryValueFromObject<O, V>> = (entry) => [entry[0], entryToValue(entry)];

  // map through entries
  const entries = getEntries(object).map(entryHandler);

  // return new object from mapped entries
  return fromEntries(entries);

}
