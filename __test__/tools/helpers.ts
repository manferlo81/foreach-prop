type UnknownArray = readonly unknown[];
type ValueOf<T extends object> = T extends UnknownArray ? T[number] : T[keyof T];

type Entry<K extends string | number, V> = [key: `${K}`, value: V];

type ArrayEntry<A extends UnknownArray> = A extends { length: 0 } ? Entry<number, never> : ValueOf<{
  [I in keyof A]: I extends number | `${number}` ? Entry<I, A[I]> : never;
}>;

type DictionaryEntry<O extends object> = keyof O extends never ? Entry<string, never> : ValueOf<{
  [K in Extract<keyof O, string | number>]: Entry<K, O[K]>;
}>;

type EntryOf<O extends object> = O extends UnknownArray ? ArrayEntry<O> : DictionaryEntry<O>;

type EntriesOf<T extends object> = Array<EntryOf<T>>;

type NormalizedObject<O extends object> = {
  [K in Extract<EntryOf<O>[0], keyof O>]: O[K];
};

interface ObjectNormalized<O extends object> {
  original: O;
  entries: EntriesOf<O>;
  normalized: NormalizedObject<O>;
}

export function normalizeObject<O extends Record<string, unknown>>(object: O): ObjectNormalized<O> {
  const entries = Object.entries(object) as EntriesOf<O>;
  const normalized = Object.fromEntries(entries) as NormalizedObject<O>;
  return { original: object, entries, normalized };
}
