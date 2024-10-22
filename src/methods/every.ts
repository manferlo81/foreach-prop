import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Anything } from '../types/helper-types';
import type { Extra, ImmutableObject, Key, StringifiedKey } from '../types/private-types';
import type { FilterCallback } from '../types/types';

export function every<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  predicate: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): boolean;

export function every<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  predicate: FilterCallback<V, StringifiedKey<K>, Extra, TH>,
  ...extra: Extra
): boolean;

export function every<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  predicate: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): boolean {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry predicate
  const entryPredicate = createResultEntryHandler(this, predicate, extra);

  // return wether or not all entries satisfy predicate
  return getEntries(object).every(entryPredicate);

}
