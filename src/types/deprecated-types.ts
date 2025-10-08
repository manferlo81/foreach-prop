import type { ForEachCallback, MapCallback, PredicateCallback, ReduceCallback } from './callback-types'
import type { Anything, UnknownArray } from './helper-types'

/** @deprecated Deprecated since 26/Oct/2024 */
export type DeprecatedMapCallback<V, K extends string, X extends UnknownArray, T = Anything, R = Anything> = MapCallback<V, K, R, X, T>

/** @deprecated Deprecated since 26/Oct/2024 */
export type DeprecatedForEachCallback<V, K extends string, X extends UnknownArray, T = Anything> = ForEachCallback<V, K, X, T>

/** @deprecated Deprecated since 26/Oct/2024 */
export type DeprecatedFilterCallback<V, K extends string, X extends UnknownArray, T = Anything> = PredicateCallback<V, K, X, T>

/** @deprecated Deprecated since 26/Oct/2024 */
export type DeprecatedReduceCallback<V, K extends string, X extends UnknownArray, T = Anything, R = Anything> = ReduceCallback<V, K, R, X, T>
