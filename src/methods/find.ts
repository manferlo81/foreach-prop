import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { createResultEntryHandler, findEntryValue } from '../tools/handle-entry';
import { isObject } from '../tools/is-object';
import { getEntries } from '../tools/object-entries';
import type { Anything, Extra, ImmutableObject, Key } from '../types/private-types';
import type { FilterCallback } from '../types/types';

export function find<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, E, TH>,
  ...extra: E
): V | undefined;

export function find<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, Extra, TH>,
  ...extra: Extra
): V | undefined;

export function find<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, E, TH>,
  ...extra: E
): V | undefined {

  // throw if not enough arguments
  const argsLen = arguments.length;
  if (argsLen < 2) throw errorNotEnoughArgs(argsLen, 2);

  // throw if not an object
  if (!isObject(object)) throw errorNotObject(object);

  // create entry handler
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // get entries
  const entries = getEntries(object);

  // find value
  return findEntryValue(entries, entryHandler);

}
