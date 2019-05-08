import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";
import { EachPropCallback } from './types'

function forEach<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: EachPropCallback<K, V, E>,
  ...extra: E
): void;
function forEach<K extends keyof any, V, E extends any[]>(
  object: Record<K, V>,
  callback: EachPropCallback<K, V, E>
): void {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      callItBack(callback, this, object, key, extra);
    }
  }

}

export default forEach;
