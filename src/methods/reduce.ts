import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createReduceEntryHandler } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Key, KeyAsString } from '../types/entry-types';
import type { Anything } from '../types/helper-types';
import type { Extra, ImmutableObject } from '../types/private-types';
import type { NextReduceCallback, ReduceCallbackFromObject } from '../types/types';

export function reduce<O extends object, R, T = unknown>(
  this: T,
  object: O,
  callback: ReduceCallbackFromObject<O, R | undefined, [], T>,
  initial?: undefined,
): R | undefined;

export function reduce<O extends object, R, T = unknown>(
  this: T,
  object: O,
  callback: ReduceCallbackFromObject<O, R, [], T>,
  initial: R,
): R;

export function reduce<O extends object, R, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: ReduceCallbackFromObject<O, R, X, T>,
  initial: R,
  ...extra: X
): R;

export function reduce<O extends object, R, T = unknown>(
  this: T,
  object: O,
  callback: ReduceCallbackFromObject<O, R, Extra, T>,
  initial: R,
  ...extra: Extra
): R;

// vvvvvvvv OLD SIGNATURES vvvvvvvv

export function reduce<V, K extends Key, X extends Extra, R = Anything, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: NextReduceCallback<V, KeyAsString<K>, R, X, T>,
  initial: R,
  ...extra: X
): R;

export function reduce<V, K extends Key, R = Anything, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: NextReduceCallback<V, KeyAsString<K>, R, Extra, T>,
  initial: R,
  ...extra: Extra
): R;

export function reduce<V, K extends Key, X extends Extra, R = Anything, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: NextReduceCallback<V, KeyAsString<K>, R, X, T>,
  initial?: R,
  ...extra: X
): R | undefined;

export function reduce<V, K extends Key, R = Anything, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: NextReduceCallback<V, KeyAsString<K>, R, Extra, T>,
  initial?: R,
  ...extra: Extra
): R | undefined;

export function reduce<O extends object, X extends Extra, R = Anything, T = Anything>(
  this: T,
  object: O,
  callback: ReduceCallbackFromObject<O, R, X, T>,
  initial?: R,
  ...extra: X
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
