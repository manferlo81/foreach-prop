import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { fromEntries, getEntries } from '../tools/object-entries';
import type { Anything, Entry, Extra, ImmutableObject, InputEntry, Key, StringifiedKey } from '../types/private-types';
import type { MapCallback } from '../types/types';

export function map<V, K extends Key, E extends Extra, RV = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: MapCallback<V, StringifiedKey<K>, E, TH, RV>,
  ...extra: E
): Record<K, RV>;

export function map<V, K extends Key, RV = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: MapCallback<V, StringifiedKey<K>, Extra, TH, RV>,
  ...extra: Extra
): Record<K, RV>;

export function map<V, K extends Key, E extends Extra, RV = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: MapCallback<V, StringifiedKey<K>, E, TH, RV>,
  ...extra: E
): Record<K, RV> {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryToValue = createResultEntryHandler(this, callback, extra);
  const entryHandler = (entry: InputEntry<V>): Entry<RV> => [entry[0], entryToValue(entry)];

  // map through entries
  const entries = getEntries(object).map(entryHandler) as unknown as Array<InputEntry<RV, K>>;

  // return new object from mapped entries
  return fromEntries(entries);

}
