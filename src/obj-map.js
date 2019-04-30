import toArray from "args-to-arr";
import hasOwn from "./has-own";

function map(object, callback) {

  const rest = toArray(arguments, 2);

  const result = {};

  for (let key in object) {
    if (
      hasOwn.call(object, key)
    ) {
      const item = callback.call(this, object[key], key, ...rest);
      result[key] = item;
    }
  }

  return result;

}

export default map;
