import toArray from "args-to-arr";
import hasOwn from "./has-own";

function findKey(object, callback) {

  const rest = toArray(arguments, 2);

  for (let key in object) {
    if (
      hasOwn.call(object, key) &&
      callback.call(this, object[key], key, ...rest)
    ) {
      return key;
    }
  }

  return null;

}

export default findKey;
