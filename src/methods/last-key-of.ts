import { ensureIsObject, ensureMinLength } from '../tools/ensure';
import { createFindValueEntryHandler, findEntryKey } from '../tools/handle-entry';
import { getEntries } from '../tools/object-entries';
import type { Anything } from '../types/helper-types';
import type { ImmutableObject, Key } from '../types/private-types';

export function lastKeyOf<K extends Key>(object: ImmutableObject<K, Anything>, value: Anything): K | null {

  // throw if not enough arguments
  ensureMinLength(arguments.length, 2);

  // throw if not an object
  ensureIsObject(object);

  // create entry handler
  const entryHandler = createFindValueEntryHandler(value);

  // get object entries in reverse order
  const entries = getEntries(object).reverse();

  // return key if found or null otherwise
  return findEntryKey(entries, entryHandler) as K | null;

}
