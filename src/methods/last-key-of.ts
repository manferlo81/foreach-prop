import { ensureIsObject, ensureMinLength } from '../tools/ensure'
import { findEntryKeyByValue } from '../tools/find-entry'
import { getEntries } from '../tools/object-entries'
import type { EntryKeyTypeFromObject } from '../types/entry-types'

export function lastKeyOf<O extends object>(object: O, value: unknown): EntryKeyTypeFromObject<O> | null {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2)

  // throw if not an object
  ensureIsObject(object)

  // get object entries in reverse order
  const entries = getEntries(object).reverse()

  // return key if found or null otherwise
  return findEntryKeyByValue(entries, value)

}
