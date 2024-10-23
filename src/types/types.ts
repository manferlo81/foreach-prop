import type { EntryKeyType, EntryTypeFromObject, EntryValueType, UnknownEntry } from './entry-types';
import type { Anything } from './helper-types';
import type { Extra } from './private-types';

export type NextMapCallback<V, K extends string, R, X extends Extra, T = unknown> = (this: T, value: V, key: K, ...extra: X) => R; // FunctionType<ResultCallbackArguments<V, K, X>, R, T>;
export type ResultCallbackFromEntry<E extends UnknownEntry, R, X extends Extra, T = unknown> = NextMapCallback<EntryValueType<E>, EntryKeyType<E>, R, X, T>;
export type ResultCallbackFromObject<O extends object, R, X extends Extra, T = unknown> = ResultCallbackFromEntry<EntryTypeFromObject<O>, R, X, T>;

export type NextReduceCallback<V, K extends string, R, X extends Extra, T = unknown> = (this: T, prev: R, value: V, key: K, ...extra: X) => R; // FunctionType<ReduceCallbackArguments<R, V, K, X>, R, T>;
export type ReduceCallbackFromEntry<E extends UnknownEntry, R, X extends Extra, T = unknown> = NextReduceCallback<EntryValueType<E>, EntryKeyType<E>, R, X, T>;
export type ReduceCallbackFromObject<O extends object, R, X extends Extra, T = unknown> = ReduceCallbackFromEntry<EntryTypeFromObject<O>, R, X, T>;

export type DeprecatedMapCallback<V, K extends string, X extends Extra, T = Anything, R = Anything> = (
  NextMapCallback<V, K, R, X, T>
);

export type ForEachCallback<V, K extends string, X extends Extra, T = Anything> = (
  NextMapCallback<V, K, void, X, T>
);

export type FilterCallback<V, K extends string, X extends Extra, T = Anything> = (
  NextMapCallback<V, K, Anything, X, T>
);

export type DeprecatedReduceCallback<V, K extends string, X extends Extra, T = Anything, R = Anything> = (
  NextReduceCallback<V, K, R, X, T>
);
