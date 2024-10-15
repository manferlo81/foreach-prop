import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { createResultEntryHandler } from '../tools/handle-entry';
import { isObject } from '../tools/is-object';
import { getEntries } from '../tools/object-entries';
import type { Anything, Extra, ImmutableObject, Key } from '../types/private-types';
import type { ForEachCallback } from '../types/types';

export function forEach<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, K, E, TH>,
  ...extra: E
): void;

export function forEach<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, K, Extra, TH>,
  ...extra: Extra
): void;

export function forEach<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, K, E, TH>,
  ...extra: E
): void {

  // throw if not enough arguments
  const argsLen = arguments.length;
  if (argsLen < 2) throw errorNotEnoughArgs(argsLen, 2);

  // throw if not an object
  if (!isObject(object)) throw errorNotObject(object);

  // create entry handler
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // iterate through object entries
  getEntries(object).forEach(entryHandler);

}
