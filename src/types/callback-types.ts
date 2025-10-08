import type { EntryKeyType, EntryTypeFromObject, EntryValueType, UnknownEntry } from './entry-types'
import type { UnknownArray } from './helper-types'

export type MapCallback<V, K extends string, R, X extends UnknownArray = UnknownArray, T = unknown> = (this: T, value: V, key: K, ...extra: X) => R
export type MapCallbackFromEntry<E extends UnknownEntry, R, X extends UnknownArray = UnknownArray, T = unknown> = MapCallback<EntryValueType<E>, EntryKeyType<E>, R, X, T>
export type MapCallbackFromObject<O extends object, R, X extends UnknownArray = UnknownArray, T = unknown> = MapCallbackFromEntry<EntryTypeFromObject<O>, R, X, T>

export type ForEachCallback<V, K extends string, X extends UnknownArray = UnknownArray, T = unknown> = MapCallback<V, K, void, X, T>
export type ForEachCallbackFromEntry<E extends UnknownEntry, X extends UnknownArray = UnknownArray, T = unknown> = ForEachCallback<EntryValueType<E>, EntryKeyType<E>, X, T>
export type ForEachCallbackFromObject<O extends object, X extends UnknownArray = UnknownArray, T = unknown> = ForEachCallbackFromEntry<EntryTypeFromObject<O>, X, T>

export type PredicateCallback<V, K extends string, X extends UnknownArray = UnknownArray, T = unknown> = MapCallback<V, K, unknown, X, T>
export type PredicateCallbackFromEntry<E extends UnknownEntry, X extends UnknownArray = UnknownArray, T = unknown> = PredicateCallback<EntryValueType<E>, EntryKeyType<E>, X, T>
export type PredicateCallbackFromObject<O extends object, X extends UnknownArray = UnknownArray, T = unknown> = PredicateCallbackFromEntry<EntryTypeFromObject<O>, X, T>

export type ReduceCallback<V, K extends string, R, X extends UnknownArray = UnknownArray, T = unknown> = (this: T, prev: R, value: V, key: K, ...extra: X) => R
export type ReduceCallbackFromEntry<E extends UnknownEntry, R, X extends UnknownArray = UnknownArray, T = unknown> = ReduceCallback<EntryValueType<E>, EntryKeyType<E>, R, X, T>
export type ReduceCallbackFromObject<O extends object, R, X extends UnknownArray = UnknownArray, T = unknown> = ReduceCallbackFromEntry<EntryTypeFromObject<O>, R, X, T>
