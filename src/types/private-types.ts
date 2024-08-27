// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Anything = any;

export type Key = Extract<keyof Anything, string | number>;
export type Extra = Anything[];

export type ImmutableObject<K extends Key, V> = Readonly<Record<K, V>>;

export type WrappedFilterCallback<
  K extends Key,
  R = Anything> = (key: K) => R;

export type WrappedReduceCallback<
  K extends Key,
  R = Anything> = (key: K, result: R | undefined) => R;
