import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler, findEntryValue } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Anything } from '../types/helper-types';
import type { Extra, ImmutableObject, Key, StringifiedKey } from '../types/private-types';
import type { FilterCallback } from '../types/types';

export function find<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): V | undefined;

export function find<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, Extra, TH>,
  ...extra: Extra
): V | undefined;

export function find<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): V | undefined {

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
