import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { fromEntries, getEntries } from '../tools/object-entries';
import type { Key, KeyAsString, MapEntryValueFromObject, ObjectTypeFromEntry, ResultEntryCallbackFromObject } from '../types/entry-types';
import type { Anything } from '../types/helper-types';
import type { Extra, ImmutableObject } from '../types/private-types';
import type { MapCallback, MapCallbackFromObject } from '../types/types';

export function map<O extends object, V, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, [], T>,
): ObjectTypeFromEntry<MapEntryValueFromObject<O, V>>;

export function map<O extends object, V, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, X, T>,
  ...extra: X
): ObjectTypeFromEntry<MapEntryValueFromObject<O, V>>;

export function map<O extends object, V, T = unknown>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, Extra, T>,
  ...extra: Extra
): ObjectTypeFromEntry<MapEntryValueFromObject<O, V>>;

// vvvvvvvv OLD SIGNATURES vvvvvvvv

export function map<V, K extends Key, X extends Extra, RV = Anything, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: MapCallback<V, KeyAsString<K>, RV, X, T>,
  ...extra: X
): Record<K, RV>;

export function map<V, K extends Key, RV = Anything, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: MapCallback<V, KeyAsString<K>, RV, Extra, T>,
  ...extra: Extra
): Record<K, RV>;

export function map<O extends object, X extends Extra, V = Anything, T = Anything>(
  this: T,
  object: O,
  callback: MapCallbackFromObject<O, V, X, T>,
  ...extra: X
): ObjectTypeFromEntry<MapEntryValueFromObject<O, V>> {

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
