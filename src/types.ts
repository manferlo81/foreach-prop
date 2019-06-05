export type Key = Extract<keyof any, string | number>;
export type Extra = any[];

export type MapCallback<
  V,
  K extends Key,
  E extends Extra,
  TH = any,
  R = any> = (
    this: TH,
    value: V,
    key: K,
    ...extra: E
  ) => R;

export type ForEachCallback<
  V,
  K extends Key,
  E extends Extra,
  TH = any> = MapCallback<V, K, E, TH, void>;

export type FilterCallback<
  V,
  K extends Key,
  E extends Extra,
  TH = any> = MapCallback<V, K, E, TH, any>;

export type WrappedFilterCallback<
  V,
  K extends Key,
  TH = any,
  R = any> = (thisArg: TH, object: Record<K, V>, key: K) => R;

export type ReduceCallback<
  V,
  K extends Key,
  E extends Extra,
  TH = any,
  R = any> = (
    this: TH,
    prev: R,
    value: V,
    key: K,
    ...extra: E
  ) => R;

export type WrappedReduceCallback<
  V,
  K extends Key,
  TH = any,
  R = any> = (thisArg: TH, object: Record<K, V>, key: K, result: R | undefined) => R;
