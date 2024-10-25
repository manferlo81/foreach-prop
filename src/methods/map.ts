import { createMapEntryCallback } from '../tools/callbacks';
import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { fromEntries, getEntries } from '../tools/object-entries';
import type { MapEntryCallbackFromObject, MapEntryValueFromObject, ObjectTypeFromEntry } from '../types/entry-types';
import type { UnknownArray } from '../types/helper-types';
import type { MapCallbackFromObject } from '../types/types';

type MappedObject<O extends object, V> = ObjectTypeFromEntry<MapEntryValueFromObject<O, V>>;

export function map<O extends object, V, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, X, T>,
  ...extra: X
): MappedObject<O, V>;

export function map<O extends object, V, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, UnknownArray, T>,
  ...extra: UnknownArray
): MappedObject<O, V>;

export function map<O extends object, X extends UnknownArray, V, T = unknown>(
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
  const entryToValue = createMapEntryCallback(this, callback, extra);

  const entryHandler: MapEntryCallbackFromObject<O, MapEntryValueFromObject<O, V>> = (entry) => [entry[0], entryToValue(entry)];

  // map through entries
  const entries = getEntries(object).map(entryHandler);

  // return new object from mapped entries
  return fromEntries(entries);

}
