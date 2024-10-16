// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Anything = any;

export type ObjectValueType<O extends object> = O extends Record<PropertyKey, infer V> ? V : never;

export type Entry<V, K extends string = string> = [K, V];
export type InputEntry<V, K extends Key = string> = readonly [K, V];

export type ObjectEntryType<O extends object> = ObjectValueType<{
  [K in keyof O]: K extends Key ? Entry<O[K], StringifiedKey<K>> : never;
}>;

export type ObjectTypeFromEntry<E extends Entry<unknown>> = {
  [K in E extends Entry<unknown, infer N> ? N : never]: E extends Entry<infer V, K> ? V : never
};

export type ImmutableObject<K extends Key, V> = Readonly<Record<K, V>>;

export type Key = Extract<PropertyKey, string | number>;
export type StringifiedKey<K extends Key> = K extends string ? K : `${K}`;
export type Extra = Anything[];

export type ResultEntryHandler<V, R> = (entry: InputEntry<V>) => R;
export type ReduceEntryHandler<V, R> = (prev: R, entry: InputEntry<V>) => R;
