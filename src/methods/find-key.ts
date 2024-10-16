import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler, findEntryKey } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Anything, Extra, ImmutableObject, Key, StringifiedKey } from '../types/private-types';
import type { FilterCallback } from '../types/types';

export function findKey<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): K | null;

export function findKey<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, Extra, TH>,
  ...extra: Extra
): K | null;

export function findKey<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): K | null {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // get entries
  const entries = getEntries(object);

  // find key
  return findEntryKey(entries, entryHandler) as K | null;

}
