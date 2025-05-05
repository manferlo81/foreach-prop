import type { MapCallbackFromEntry, ReduceCallbackFromEntry } from '../types/callback-types'
import type { ReduceEntryCallback, ResultEntryCallback } from '../types/entry-callback-types'
import type { UnknownEntry } from '../types/entry-types'
import type { UnknownArray } from '../types/helper-types'
import { ensureIsFunction } from './ensure'

export function createMapEntryCallback<E extends UnknownEntry, R, X extends UnknownArray, T>(
  thisArg: T,
  callback: MapCallbackFromEntry<E, R, X, T>,
  extra: X,
): ResultEntryCallback<E, R> {
  ensureIsFunction(callback)
  return ([key, value]) => callback.call(thisArg, value, key, ...extra)
}

export function createReduceEntryCallback<E extends UnknownEntry, X extends UnknownArray, T, R>(
  thisArg: T,
  callback: ReduceCallbackFromEntry<E, R, X, T>,
  extra: X,
): ReduceEntryCallback<E, R> {
  ensureIsFunction(callback)
  return (prev, [key, value]) => callback.call(thisArg, prev, value, key, ...extra)
}
