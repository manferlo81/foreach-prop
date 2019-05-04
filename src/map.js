import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";

function map(object, callback) {

  const extra = toArray(arguments, 2);
  const result = {};

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      result[key] = callItBack(callback, this, object, key, extra);
    }
  }

  return result;

}

export default map;
