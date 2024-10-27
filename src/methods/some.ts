import { createMapEntryCallback } from '../tools/callbacks';
import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { getEntries } from '../tools/object-entries';
import type { PredicateCallbackFromObject } from '../types/callback-types';
import type { UnknownArray } from '../types/helper-types';

export function some<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, [], T>,
): boolean;

export function some<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, X, T>,
  ...extra: X
): boolean;

export function some<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, UnknownArray, T>,
  ...extra: UnknownArray
): boolean;

export function some<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, X, T>,
  ...extra: X
): boolean {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry predicate
  const entryPredicate = createMapEntryCallback(this, predicate, extra);

  // return wether or not at least one entry satisfies predicate
  return getEntries(object).some(entryPredicate);

}
