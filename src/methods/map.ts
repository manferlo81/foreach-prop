import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { createResultEntryHandler } from '../tools/handle-entry';
import { isObject } from '../tools/is-object';
import { fromEntries, getEntries } from '../tools/object-entries';
import type { Anything, EntryFromObject, Extra, ImmutableObject, InputEntry, Key } from '../types/private-types';
import type { MapCallback } from '../types/types';

export function map<V, K extends Key, E extends Extra, RV = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: MapCallback<V, K, E, TH, RV>,
  ...extra: E
): Record<K, RV>;

export function map<V, K extends Key, RV = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: MapCallback<V, K, Extra, TH, RV>,
  ...extra: Extra
): Record<K, RV>;

export function map<V, K extends Key, E extends Extra, RV = Anything, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: MapCallback<V, K, E, TH, RV>,
  ...extra: E
): Record<K, RV> {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  // throw if not enough arguments
  if (argsLen < 2) {
    throw errorNotEnoughArgs(argsLen, 2);
  }

  // throw if not an object
  if (!isObject(object)) {
    throw errorNotObject(object);
  }

  // create entry handler
  const entryToValue = createResultEntryHandler(this, callback, extra);
  const entryHandler = (entry: InputEntry<V>): EntryFromObject<RV> => [entry[0], entryToValue(entry)];

  // map through entries
  const entries = getEntries(object).map(entryHandler) as unknown as Array<InputEntry<RV, K>>;

  // return new object from mapped entries
  return fromEntries(entries);

}
