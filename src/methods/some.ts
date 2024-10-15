import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { createResultEntryHandler } from '../tools/handle-entry';
import { isObject } from '../tools/is-object';
import { getEntries } from '../tools/object-entries';
import type { Anything, Extra, ImmutableObject, Key } from '../types/private-types';
import type { FilterCallback } from '../types/types';

export function some<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  predicate: FilterCallback<V, K, E, TH>,
  ...extra: E
): boolean;

export function some<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  predicate: FilterCallback<V, K, Extra, TH>,
  ...extra: Extra
): boolean;

export function some<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  predicate: FilterCallback<V, K, E, TH>,
  ...extra: E
): boolean {

  // throw if not enough arguments
  const argsLen = arguments.length;
  if (argsLen < 2) throw errorNotEnoughArgs(argsLen, 2);

  // throw if not an object
  if (!isObject(object)) throw errorNotObject(object);

  // create entry predicate
  const entryPredicate = createResultEntryHandler(this, predicate, extra);

  // return wether or not at least one entry satisfies predicate
  return getEntries(object).some(entryPredicate);

}
