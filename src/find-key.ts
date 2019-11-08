import { invalidObject, notEnoughArgs } from './errors'
import hasOwn from './has-own'
import isObject from './is-object'
import { Extra, FilterCallback, Key } from './types'
import { wrapFilterCallback } from './wrap-callback'

function findKey<V, K extends Key, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<V, K, E, TH>,
  ...extra: E
): K | null;

function findKey<V, K extends Key, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<V, K, Extra, TH>,
  ...extra: Extra
): K | null;

function findKey<V, K extends Key, E extends Extra, TH = any>(
  this: TH,
  object: Record<K, V>,
  callback: FilterCallback<V, K, E, TH>,
): K | null {

  // eslint-disable-next-line prefer-rest-params
  const args = arguments
  const argsLen = args.length

  if (argsLen < 2) {
    throw notEnoughArgs(argsLen, 2)
  }

  if (!isObject(object)) {
    throw invalidObject(object)
  }

  const wrapped = wrapFilterCallback<V, K, E, TH, any>(
    callback,
    this,
    object,
    args,
    argsLen,
  )

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      wrapped(key)
    ) {
      return key
    }
  }

  return null

}

export default findKey
