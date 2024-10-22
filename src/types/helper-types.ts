// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Anything = any;

export type ObjectValueType<O extends object> = O extends Record<PropertyKey, infer V> ? V : never;
