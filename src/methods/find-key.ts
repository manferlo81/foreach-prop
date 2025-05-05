import { ensureIsObject, ensureMinLength } from '../tools/ensure'
import { findEntryKeyByPredicate } from '../tools/find-entry'
import { getEntries } from '../tools/object-entries'
import type { PredicateCallbackFromObject } from '../types/callback-types'
import type { EntryKeyTypeFromObject } from '../types/entry-types'
import type { UnknownArray } from '../types/helper-types'

export function findKey<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, [], T>,
): EntryKeyTypeFromObject<O> | null

export function findKey<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, X, T>,
  ...extra: X
): EntryKeyTypeFromObject<O> | null

export function findKey<O extends object, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, UnknownArray, T>,
  ...extra: UnknownArray
): EntryKeyTypeFromObject<O> | null

export function findKey<O extends object, X extends UnknownArray, T = unknown>(
  this: T,
  object: O,
  predicate: PredicateCallbackFromObject<O, X, T>,
  ...extra: X
): EntryKeyTypeFromObject<O> | null {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2)

  // throw if not an object
  ensureIsObject(object)

  // get entries
  const entries = getEntries(object)

  // find key
  return findEntryKeyByPredicate(this, entries, predicate, extra)

}
