import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Key, KeyAsString } from '../types/entry-types';
import type { Anything } from '../types/helper-types';
import type { Extra, ImmutableObject } from '../types/private-types';
import type { ForEachCallback, ResultCallbackFromObject } from '../types/types';

export function forEach<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, void, [], T>,
): void;

export function forEach<O extends object, X extends Extra, T = unknown>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, void, X, T>,
  ...extra: X
): void;

export function forEach<O extends object, T = unknown>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, void, Extra, T>,
  ...extra: Extra
): void;

// vvvvvvvv OLD SIGNATURES vvvvvvvv

export function forEach<V, K extends Key, X extends Extra, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, KeyAsString<K>, X, T>,
  ...extra: X
): void;

export function forEach<V, K extends Key, T = Anything>(
  this: T,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, KeyAsString<K>, Extra, T>,
  ...extra: Extra
): void;

export function forEach<O extends object, X extends Extra, T = Anything>(
  this: T,
  object: O,
  callback: ResultCallbackFromObject<O, void, X, T>,
  ...extra: X
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
