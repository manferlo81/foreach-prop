import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { createResultEntryHandler } from '../tools/handle-entry';
import { fromEntries, getEntries } from '../tools/object-entries';
import { isObject } from '../tools/is-object';
import type { Anything, Extra, ImmutableObject, InputEntry, Key, StringifiedKey } from '../types/private-types';
import type { FilterCallback } from '../types/types';

export function filter<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): Record<K, V>;

export function filter<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, Extra, TH>,
  ...extra: Extra
): Record<K, V>;

export function filter<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, StringifiedKey<K>, E, TH>,
  ...extra: E
): Record<K, V> {

  // throw if not enough arguments
  const argsLen = arguments.length;
  if (argsLen < 2) throw errorNotEnoughArgs(argsLen, 2);

  // throw if not an object
  if (!isObject(object)) throw errorNotObject(object);

  // create entry handler
  const entryHandler = createResultEntryHandler(this, callback, extra);

  // filter entries
  const entries = getEntries(object).filter(entryHandler) as unknown as Array<InputEntry<V, K>>;

  // return new object from filtered entries
  return fromEntries(entries);

}
