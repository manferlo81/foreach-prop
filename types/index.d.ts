export type EachPropCallback<K extends keyof any, V> = (value: V, key: K) => any;
declare function eachProp<K extends keyof any, V>(object: Record<K, V>, callback: EachPropCallback<K, V>): K | null;
export = eachProp;
