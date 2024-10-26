// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Anything = any;
export type UnknownArray = readonly unknown[];

export type ArrayItemType<O extends UnknownArray> = O[number];
export type DictionaryValueType<O extends object> = O[keyof O];
