import type { Anything, Extra } from './private-types';

export type MapCallback_next<V, K extends string, R, E extends Extra, TH = Anything> = (
  (this: TH, value: V, key: K, ...extra: E) => R
);

export type MapCallback<V, K extends string, E extends Extra, TH = Anything, R = Anything> = (
  MapCallback_next<V, K, R, E, TH>
);

export type ForEachCallback<V, K extends string, E extends Extra, TH = Anything> = (
  MapCallback_next<V, K, void, E, TH>
);

export type FilterCallback<V, K extends string, E extends Extra, TH = Anything> = (
  MapCallback_next<V, K, Anything, E, TH>
);

export type ReduceCallback_next<V, K extends string, R, E extends Extra, TH = Anything> = (
  (this: TH, prev: R, value: V, key: K, ...extra: E) => R
);

export type ReduceCallback<V, K extends string, E extends Extra, TH = Anything, R = Anything> = (
  ReduceCallback_next<V, K, R, E, TH>
);
