type ArrayItemValue<T extends unknown[]> = T extends Array<infer V> ? V : never;
type ObjectPropValue<T extends object> = T extends Record<PropertyKey, infer V> ? V : never;
type ValueOf<T extends object> = T extends unknown[] ? ArrayItemValue<T> : ObjectPropValue<T>;

type EntriesOf<T> = Array<ValueOf<{ [K in keyof T]: [K, T[K]] }>>;

export function normalizeObject<T extends Record<string, unknown>>(object: T): [T, EntriesOf<T>] {
  const entries = Object.entries(object);
  const result = Object.fromEntries(entries) as T;
  return [result, entries as never];
}
