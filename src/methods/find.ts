import { errorNotEnoughArgs, errorNotObject } from '../tools/errors';
import { isObject } from '../tools/is-object';
import { wrapFilterCallback } from '../tools/wrap-callback';
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
): V | undefined {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) throw errorNotEnoughArgs(argsLen, 2);

  if (!isObject(object)) throw errorNotObject(object);

  const wrapped = wrapFilterCallback<V, K, E, TH>(
    callback,
    this,
    object,
    args,
    argsLen,
  );

  const keys = Object.keys(object) as K[];
  const key = keys.find(wrapped);
  if (key == null) return;
  return object[key];

}
