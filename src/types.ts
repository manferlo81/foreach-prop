// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Anything = any;

export type Key = Extract<keyof Anything, string | number>;
export type Extra = Anything[];

export type ImmutableObject<K extends Key, V> = Readonly<Record<K, V>>;

export type MapCallback<
  V,
  K extends Key,
  E extends Extra,
  TH = Anything,
  R = Anything> = (
    this: TH,
    value: V,
    key: K,
    ...extra: E
  ) => R;

export type ForEachCallback<
  V,
  K extends Key,
  E extends Extra,
  TH = Anything> = MapCallback<V, K, E, TH, void>;

export type FilterCallback<
  V,
  K extends Key,
  E extends Extra,
  TH = Anything> = MapCallback<V, K, E, TH>;

export type WrappedFilterCallback<
  K extends Key,
  R = Anything> = (key: K) => R;

export type ReduceCallback<
  V,
  K extends Key,
  E extends Extra,
  TH = Anything,
  R = Anything> = (
    this: TH,
    prev: R,
    value: V,
    key: K,
    ...extra: E
  ) => R;

export type WrappedReduceCallback<
  K extends Key,
  R = Anything> = (key: K, result: R | undefined) => R;
