import type { Anything } from './helper-types';

export type ImmutableObject<K extends Key, V> = Readonly<Record<K, V>>;

export type Key = Extract<PropertyKey, string | number>;
export type StringifiedKey<K extends Key> = K extends string ? K : `${K}`;
export type Extra = Anything[];
