import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { createFindValueEntryHandler, findEntryKey } from '../tools/handle-entry';
import { isObject } from '../tools/is-object';
import { getEntries } from '../tools/object-entries';
import type { Anything, ImmutableObject, Key } from '../types/private-types';

export function lastKeyOf<K extends Key>(object: ImmutableObject<K, Anything>, value: Anything): K | null {

  // throw if not enough arguments
  const argsLen = arguments.length;
  if (argsLen < 2) throw errorNotEnoughArgs(argsLen, 2);

  // throw if not an object
  if (!isObject(object)) throw errorNotObject(object);

  // create entry handler
  const entryHandler = createFindValueEntryHandler(value);

  // get object entries in reverse order
  const entries = getEntries(object).reverse();

  // return key if found or null otherwise
  return findEntryKey(entries, entryHandler) as K | null;

}
