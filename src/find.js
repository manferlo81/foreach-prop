import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";

function find(object, callback) {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      const value = object[key];
      if (callItBack(callback, this, object, key, extra)) {
        return value;
      }
    }
  }

}

export default find;
