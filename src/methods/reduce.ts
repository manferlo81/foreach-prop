import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createReduceEntryHandler } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Extra } from '../types/private-types';
import type { ReduceCallbackFromObject } from '../types/types';

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

export function reduce<O extends object, R, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: ReduceCallbackFromObject<O, R | undefined, X, T>,
  initial: R | undefined,
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
  return entries.reduce(entryHandler, initial);

}
