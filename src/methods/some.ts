import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createResultEntryHandler } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Anything } from '../types/helper-types';
import type { Extra } from '../types/private-types';
import type { MapCallbackFromObject } from '../types/types';

export function some<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: MapCallbackFromObject<O, unknown, [], T>,
): boolean;

export function some<O extends object, X extends Extra, T = unknown>(
  this: T,
  object: O,
  predicate: MapCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): boolean;

export function some<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: MapCallbackFromObject<O, unknown, Extra, T>,
  ...extra: Extra
): boolean;

// vvvvvvvv OLD SIGNATURES vvvvvvvv

// export function some<V, K extends Key, X extends Extra, T = Anything>(
//   this: T,
//   object: ImmutableObject<K, V>,
//   predicate: FilterCallback<V, KeyAsString<K>, X, T>,
//   ...extra: X
// ): boolean;

// export function some<V, K extends Key, T = Anything>(
//   this: T,
//   object: ImmutableObject<K, V>,
//   predicate: FilterCallback<V, KeyAsString<K>, Extra, T>,
//   ...extra: Extra
// ): boolean;

export function some<O extends object, X extends Extra, T = Anything>(
  this: T,
  object: O,
  predicate: MapCallbackFromObject<O, unknown, X, T>,
  ...extra: X
): boolean {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry predicate
  const entryPredicate = createResultEntryHandler(this, predicate, extra);

  // return wether or not at least one entry satisfies predicate
  return getEntries(object).some(entryPredicate);

}
