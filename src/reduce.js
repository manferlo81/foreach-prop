import toArray from "args-to-arr";
import hasOwn from "./has-own";

function reduce(object, callback, initial) {

  const extra = toArray(arguments, 3);
  let result = initial;

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result = callback.call(this, result, object[key], key, ...extra);
    }
  }

  return result;

}

export default reduce;
