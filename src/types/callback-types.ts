import type { EntryKeyType, EntryTypeFromObject, EntryValueType, UnknownEntry } from './entry-types';
import type { Anything, UnknownArray } from './helper-types';

export type MapCallback<V, K extends string, R, X extends UnknownArray = UnknownArray, T = unknown> = (this: T, value: V, key: K, ...extra: X) => R;
export type MapCallbackFromEntry<E extends UnknownEntry, R, X extends UnknownArray = UnknownArray, T = unknown> = MapCallback<EntryValueType<E>, EntryKeyType<E>, R, X, T>;
export type MapCallbackFromObject<O extends object, R, X extends UnknownArray = UnknownArray, T = unknown> = MapCallbackFromEntry<EntryTypeFromObject<O>, R, X, T>;

export type ForEachCallback<V, K extends string, X extends UnknownArray = UnknownArray, T = unknown> = MapCallback<V, K, void, X, T>;
export type ForEachCallbackFromEntry<E extends UnknownEntry, X extends UnknownArray = UnknownArray, T = unknown> = DeprecatedForEachCallback<EntryValueType<E>, EntryKeyType<E>, X, T>;
export type ForEachCallbackFromObject<O extends object, X extends UnknownArray = UnknownArray, T = unknown> = ForEachCallbackFromEntry<EntryTypeFromObject<O>, X, T>;

export type PredicateCallback<V, K extends string, X extends UnknownArray = UnknownArray, T = unknown> = MapCallback<V, K, unknown, X, T>;
export type PredicateCallbackFromEntry<E extends UnknownEntry, X extends UnknownArray = UnknownArray, T = unknown> = PredicateCallback<EntryValueType<E>, EntryKeyType<E>, X, T>;
export type PredicateCallbackFromObject<O extends object, X extends UnknownArray = UnknownArray, T = unknown> = PredicateCallbackFromEntry<EntryTypeFromObject<O>, X, T>;

export type ReduceCallback<V, K extends string, R, X extends UnknownArray = UnknownArray, T = unknown> = (this: T, prev: R, value: V, key: K, ...extra: X) => R;
export type ReduceCallbackFromEntry<E extends UnknownEntry, R, X extends UnknownArray = UnknownArray, T = unknown> = ReduceCallback<EntryValueType<E>, EntryKeyType<E>, R, X, T>;
export type ReduceCallbackFromObject<O extends object, R, X extends UnknownArray = UnknownArray, T = unknown> = ReduceCallbackFromEntry<EntryTypeFromObject<O>, R, X, T>;

/** @deprecated */
export type DeprecatedMapCallback<V, K extends string, X extends UnknownArray, T = Anything, R = Anything> = MapCallback<V, K, R, X, T>;
/** @deprecated */
export type DeprecatedForEachCallback<V, K extends string, X extends UnknownArray, T = Anything> = ForEachCallback<V, K, X, T>;
/** @deprecated */
export type DeprecatedFilterCallback<V, K extends string, X extends UnknownArray, T = Anything> = PredicateCallback<V, K, X, T>;
/** @deprecated */
export type DeprecatedReduceCallback<V, K extends string, X extends UnknownArray, T = Anything, R = Anything> = ReduceCallback<V, K, R, X, T>;
