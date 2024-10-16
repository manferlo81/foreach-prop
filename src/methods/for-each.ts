import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Anything, Extra, ImmutableObject, Key, StringifiedKey } from '../types/private-types';
import type { ForEachCallback } from '../types/types';

export function forEach<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): void;

export function forEach<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, StringifiedKey<K>, Extra, TH>,
  ...extra: Extra
): void;

export function forEach<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): void {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // iterate through object entries
  getEntries(object).forEach(entryHandler);

}
