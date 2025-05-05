import { createMapEntryCallback } from '../tools/callbacks'
import { ensureIsObject, ensureMinLength } from '../tools/ensure'
import { fromEntries, getEntries } from '../tools/object-entries'
import type { PredicateCallbackFromObject } from '../types/callback-types'
import type { FilteredObject } from '../types/entry-types'
import type { UnknownArray } from '../types/helper-types'

export function filter<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, [], T>,
): FilteredObject<O>

export function filter<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, X, T>,
  ...extra: X
): FilteredObject<O>

export function filter<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, UnknownArray, T>,
  ...extra: UnknownArray
): FilteredObject<O>

export function filter<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, X, T>,
  ...extra: X
): FilteredObject<O> {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2)

  // throw if not an object
  ensureIsObject(object)

  // create entry predicate
  const entryPredicate = createMapEntryCallback(this, predicate, extra)

  // filter entries
  const entries = getEntries(object).filter(entryPredicate)

  // return new object from filtered entries
  return fromEntries(entries)

}
