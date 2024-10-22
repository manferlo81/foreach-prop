import type { ObjectValueType } from './helper-types';
import type { Key, StringifiedKey } from './private-types';

export type Entry<V, K extends string = string> = [K, V];
export type InputEntry<V, K extends Key = string> = readonly [K, V];

export type ObjectEntryType<O extends object> = ObjectValueType<{
  [K in keyof O]: K extends Key ? Entry<O[K], StringifiedKey<K>> : never;
}>;

export type ObjectTypeFromEntry<E extends Entry<unknown>> = {
  [K in E extends Entry<unknown, infer N> ? N : never]: E extends Entry<infer V, K> ? V : never;
};

export type ResultEntryHandler<V, R> = (entry: InputEntry<V>) => R;
export type ReduceEntryHandler<V, R> = (prev: R, entry: InputEntry<V>) => R;
