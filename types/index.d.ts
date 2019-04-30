
declare type EachPropCallback<K extends keyof any, V> = (value: V, key: K) => any;
declare function forEach<K extends keyof any, V>(object: Record<K, V>, callback: EachPropCallback<K, V>): void;
declare function map<K extends keyof any, V, N = any>(object: Record<K, V>, callback: EachPropCallback<K, V>): Record<K, N>;
declare function findKey<K extends keyof any, V>(object: Record<K, V>, callback: EachPropCallback<K, V>): K | null;

export { forEach, map, findKey };
