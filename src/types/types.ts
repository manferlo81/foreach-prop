import type { Anything, Extra, Key } from './private-types';

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
