import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { createResultEntryHandler, findEntryKey } from '../tools/handle-entry';
import { isObject } from '../tools/is-object';
import { getEntries } from '../tools/object-entries';
import type { Anything, Extra, ImmutableObject, Key, StringifiedKey } from '../types/private-types';
import type { FilterCallback } from '../types/types';

export function findKey<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): K | null;

export function findKey<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, Extra, TH>,
  ...extra: Extra
): K | null;

export function findKey<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): K | null {

  // throw if not enough arguments
  const argsLen = arguments.length;
  if (argsLen < 2) throw errorNotEnoughArgs(argsLen, 2);

  // throw if not an object
  if (!isObject(object)) throw errorNotObject(object);

  // create entry handler
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // get entries
  const entries = getEntries(object);

  // find key
  return findEntryKey(entries, entryHandler) as K | null;

}
