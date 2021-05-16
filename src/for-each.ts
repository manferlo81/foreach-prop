import { invalidObject, notEnoughArgs } from './errors';
import hasOwn from './has-own';
import isObject from './is-object';
import { Anything, Extra, ForEachCallback, ImmutableObject, Key } from './types';
import { wrapFilterCallback } from './wrap-callback';

function forEach<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, K, E, TH>,
  ...extra: E
): void;

function forEach<V, K extends Key, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, K, Extra, TH>,
  ...extra: Extra
): void;

function forEach<V, K extends Key, E extends Extra, TH = Anything>(
  this: TH,
  object: ImmutableObject<K, V>,
  callback: ForEachCallback<V, K, E, TH>,
): void {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  const argsLen = args.length;

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2);
  }

  if (!isObject(object)) {
    throw invalidObject(object);
  }

  const wrapped = wrapFilterCallback<V, K, E, TH, void>(
    callback,
    this,
    object,
    args,
    argsLen,
  );

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      wrapped(key);
    }
  }

}

export default forEach;
