import type { ArrayItemType, DictionaryValueType, UnknownArray } from './helper-types';

export type Key = Extract<PropertyKey, string | number>;
export type KeyAsString<K extends Key> = K extends string ? K : `${K}`;

export type Entry<V, K extends string> = [key: K, value: V];
export type UnknownEntry = Entry<unknown, string>;

export type ReadonlyEntry<V, K extends string> = Readonly<Entry<V, K>>;
export type ReadonlyUnknownEntry = Readonly<UnknownEntry>;

export type InputEntry<V, K extends Key> = readonly [key: K, value: V];
export type UnknownInputEntry = InputEntry<unknown, Key>;

export type EntryFromInputEntry<E extends UnknownInputEntry> = E extends InputEntry<infer V, infer K> ? Entry<V, KeyAsString<K>> : never;

export type EntryKeyType<E extends ReadonlyUnknownEntry> = E[0];
export type EntryKeyTypeFromObject<O extends object> = EntryKeyType<EntryTypeFromObject<O>>;

export type EntryValueType<E extends ReadonlyUnknownEntry> = E[1];
export type EntryValueTypeFromObject<O extends object> = EntryValueType<EntryTypeFromObject<O>>;

type ExtractEntryWithKey<E extends ReadonlyUnknownEntry, K extends EntryKeyType<E>> = E extends Entry<unknown, K> ? E : Entry<never, K> extends E ? Entry<EntryValueType<E>, K> : never;

export type EntryTypeFromArray<O extends UnknownArray> = O extends { length: 0 } ? Entry<never, KeyAsString<number>> : ArrayItemType<{
  [K in keyof O]: Entry<O[K], KeyAsString<K>>;
}>;

type EntryTypeFromDictionary<O extends object> = keyof O extends never ? Entry<never, string> : DictionaryValueType<{
  [K in Extract<keyof O, Key>]: Entry<O[K], KeyAsString<K>>;
}>;

export type EntryTypeFromObject<O extends object> = O extends UnknownArray ? EntryTypeFromArray<O> : EntryTypeFromDictionary<O>;

export type ObjectTypeFromEntry<E extends ReadonlyUnknownEntry> = {
  [K in EntryKeyType<E>]: EntryValueType<ExtractEntryWithKey<E, K>>
};

export type MapEntryValue<E extends UnknownEntry, V> = DictionaryValueType<{
  [K in EntryKeyType<E>]: Entry<V, K>
}>;
export type MapEntryValueFromObject<O extends object, V> = MapEntryValue<EntryTypeFromObject<O>, V>;

export type ResultEntryCallback<E extends UnknownEntry, R> = (entry: E) => R;
export type ResultEntryCallbackFromObject<O extends object, R> = ResultEntryCallback<EntryTypeFromObject<O>, R>;

export type ReduceEntryCallback<E extends UnknownEntry, R> = (prev: R, entry: E) => R;
export type ReduceEntryCallbackFromObject<O extends object, R> = ReduceEntryCallback<EntryTypeFromObject<O>, R>;
