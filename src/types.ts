export type EachPropCallback<
  K extends keyof any,
  V,
  E extends any[],
  TH = any> = (
    this: TH,
    value: V,
    key: K,
    ...extra: E
  ) => void;

export type MapCallback<
  K extends keyof any,
  V,
  E extends any[],
  N = any,
  TH = any> = (
    this: TH,
    value: V,
    key: K,
    ...extra: E
  ) => N;

export type FilterCallback<
  K extends keyof any,
  V,
  E extends any[],
  TH = any> = (
    this: TH,
    value: V,
    key: K,
    ...extra: E
  ) => any;

export type ReduceCallback<
  K extends keyof any,
  V,
  E extends any[],
  T = any,
  TH = any> = (
    this: TH,
    prev: T,
    value: V,
    key: K,
    ...extra: E
  ) => T;
