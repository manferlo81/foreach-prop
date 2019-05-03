import toArray from "args-to-arr";
import hasOwn from "./has-own";

function filter(object, callback) {

  const extra = toArray(arguments, 2);
  const result = {};

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      const value = object[key];
      if (callback.call(this, value, key, ...extra)) {
        result[key] = value;
      }
    }
  }

  return result;

}

export default filter;
