import type { ArrayItemType, DictionaryValueType, UnknownArray } from './helper-types';

export type Key = Extract<PropertyKey, string | number>;

export type Entry<V, K extends string> = [key: K, value: V];
export type ReadonlyEntry<V, K extends string> = Readonly<Entry<V, K>>;
export type InputEntry<V, K extends Key> = readonly [key: K, value: V];

export type UnknownEntry = Entry<unknown, string>;
export type UnknownReadonlyEntry = Readonly<UnknownEntry>;
export type UnknownInputEntry = InputEntry<unknown, Key>;

export type EntryKeyType<E extends UnknownInputEntry> = E[0];
export type EntryKeyTypeFromObject<O extends object> = EntryKeyType<EntryTypeFromObject<O>>;

export type EntryValueType<E extends UnknownInputEntry> = E[1];
export type EntryValueTypeFromObject<O extends object> = EntryValueType<EntryTypeFromObject<O>>;

type ExtractEntryValueWithKey<E extends UnknownInputEntry, K extends EntryKeyType<E>> = E extends InputEntry<infer V, K> ? V : InputEntry<never, K> extends Readonly<E> ? EntryValueType<E> : never;

export type EntryTypeFromArray<O extends UnknownArray> = O extends { length: 0 } ? Entry<never, `${number}`> : ArrayItemType<{
  [K in keyof O]: Entry<O[K], `${K}`>;
}>;

type EntryTypeFromDictionary<O extends object> = keyof O extends never ? Entry<never, string> : DictionaryValueType<{
  [K in Extract<keyof O, Key>]: Entry<O[K], `${K}`>;
}>;

export type EntryTypeFromObject<O extends object> = O extends UnknownArray ? EntryTypeFromArray<O> : EntryTypeFromDictionary<O>;

export type ObjectTypeFromEntry<E extends UnknownInputEntry> = {
  [K in EntryKeyType<E>]: ExtractEntryValueWithKey<E, K>
};

export type ObjectTypeFromValueKey<V, K extends Key> = ObjectTypeFromEntry<InputEntry<V, K>>;

export type FilledObject<O extends object, V> = ObjectTypeFromValueKey<V, EntryKeyTypeFromObject<O>>;
export type MappedObject<O extends object, V> = ObjectTypeFromValueKey<V, EntryKeyTypeFromObject<O>>;
export type FilteredObject<O extends object> = Partial<ObjectTypeFromEntry<EntryTypeFromObject<O>>>;
