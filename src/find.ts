import { invalidObject, notEnoughArgs } from './errors';
import hasOwn from './has-own';
import isObject from './is-object';
import { Anything, Extra, FilterCallback, ImmutableObject, Key } from './types';
import { wrapFilterCallback } from './wrap-callback';

function find<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, E, TH>,
  ...extra: E
): V | undefined;

function find<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, Extra, TH>,
  ...extra: Extra
): V | undefined;

function find<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: FilterCallback<V, K, E, TH>,
): V | undefined {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
  }

  const wrapped = wrapFilterCallback<V, K, E, TH>(
    callback,
    this,
    object,
    args,
    argsLen,
  );

  for (const key in object) {
    if (
      hasOwn.call(object, key)
      && wrapped(key)
    ) {
      return object[key];
    }
  }

}

export default find;
