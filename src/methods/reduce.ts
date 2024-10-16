import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createReduceEntryHandler } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Anything, Extra, ImmutableObject, Key, StringifiedKey } from '../types/private-types';
import type { ReduceCallback } from '../types/types';

export function reduce<V, K extends Key, E extends Extra, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, StringifiedKey<K>, E, TH, R>,
  initial: R,
  ...extra: E
): R;

export function reduce<V, K extends Key, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, StringifiedKey<K>, Extra, TH, R>,
  initial: R,
  ...extra: Extra
): R;

export function reduce<V, K extends Key, E extends Extra, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, StringifiedKey<K>, E, TH, R>,
  initial?: R,
  ...extra: E
): R | undefined;

export function reduce<V, K extends Key, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, StringifiedKey<K>, Extra, TH, R>,
  initial?: R,
  ...extra: Extra
): R | undefined;

export function reduce<V, K extends Key, E extends Extra, R = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ReduceCallback<V, StringifiedKey<K>, E, TH, R>,
  initial?: R,
  ...extra: E
): R | undefined {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createReduceEntryHandler(this, callback, extra);

  // get entries
  const entries = getEntries(object);

  // reduce entries into a result
  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
  return entries.reduce<R>(entryHandler, initial as R) as R | undefined;

}
