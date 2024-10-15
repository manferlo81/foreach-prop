// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Anything = any;

export type ArrayItemValue<T extends unknown[]> = T extends Array<infer V> ? V : never;
export type ObjectPropValue<T extends object> = T extends Record<PropertyKey, infer V> ? V : never;
export type ValueOf<T extends object> = T extends unknown[] ? ArrayItemValue<T> : ObjectPropValue<T>;

export type EntryFromObject<V, K extends Key = string> = [StringifiedKey<K>, V];
export type InputEntry<V, K extends Key = string> = readonly [K, V];

export type ImmutableObject<K extends Key, V> = Readonly<Record<K, V>>;

export type Key = Extract<PropertyKey, string | number>;
export type StringifiedKey<K extends Key> = K extends string ? K : `${K}`;
export type Extra = Anything[];

export type ResultEntryHandler<V, R> = (entry: InputEntry<V>) => R;
export type ReduceEntryHandler<V, R> = (prev: R, entry: InputEntry<V>) => R;

export type ObjectEntriesOf<T> = Array<ValueOf<{ [K in keyof T]: K extends Key ? EntryFromObject<T[K], K> : never }>>;
