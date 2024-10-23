import { Key } from './entry-types';
import type { Anything } from './helper-types';

export type ImmutableObject<K extends Key, V> = Readonly<Record<K, V>>;

export type Extra = Anything[];
