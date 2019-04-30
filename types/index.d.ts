
declare type EachPropCallback<K extends keyof any, V, E extends any[]> = (value: V, key: K, ...extra: E) => void;
declare type MapCallback<K extends keyof any, V, E extends any[], N = any> = (value: V, key: K, ...extra: E) => N;
declare type FilterCallback<K extends keyof any, V, E extends any[]> = (value: V, key: K, ...extra: E) => any;
declare type ReduceCallback<K extends keyof any, V, E extends any[], T = any> = (prev: T, value: V, key: K, ...extra: E) => T;

declare function forEach<K extends keyof any, V, E extends any[]>(object: Record<K, V>, callback: EachPropCallback<K, V, E>, ...extra: E): void;
declare function map<K extends keyof any, V, E extends any[], N = any>(object: Record<K, V>, callback: MapCallback<K, V, E, N>, ...extra: E): Record<K, N>;
declare function keyOf<K extends keyof any, V>(object: Record<K, V>, value: V): K | null;
declare function findKey<K extends keyof any, V, E extends any[]>(object: Record<K, V>, callback: FilterCallback<K, V, E>, ...extra: E): K | null;
declare function filter<K extends keyof any, V, E extends any[]>(object: Record<K, V>, callback: FilterCallback<K, V, E>, ...extra: E): Record<K, V>;
declare function reduce<K extends keyof any, V, E extends any[], T = any>(object: Record<K, V>, callback: ReduceCallback<K, V, E, T>, initial: T, ...extra: E): T;

export { forEach, map, keyOf, findKey, filter, reduce };
