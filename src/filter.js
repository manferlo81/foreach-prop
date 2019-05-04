import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";

function filter(object, callback) {

  const extra = toArray(arguments, 2);
  const result = {};

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      if (callItBack(callback, this, object, key, extra)) {
        result[key] = object[key];
      }
    }
  }

  return result;

}

export default filter;
