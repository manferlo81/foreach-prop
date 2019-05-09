export type Key = keyof any;
export type Extra = any[];

export type MapCallback<
  K extends Key,
  V,
  E extends Extra,
  TH = any,
  R = any> = (
    this: TH,
    value: V,
    key: K,
    ...extra: E
  ) => R;

export type ReduceCallback<
  K extends Key,
  V,
  E extends Extra,
  R = any,
  TH = any> = (
    this: TH,
    prev: R,
    value: V,
    key: K,
    ...extra: E
  ) => R;

export type ForEachCallback<
  K extends Key,
  V,
  E extends Extra,
  TH = any> = MapCallback<K, V, E, TH, void>;

export type FilterCallback<
  K extends Key,
  V,
  E extends Extra,
  TH = any> = MapCallback<K, V, E, TH, any>;
