import toArray from "args-to-arr";
import hasOwn from "./has-own";

function find(object, callback) {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      const value = object[key];
      if (callback.call(this, value, key, ...extra)) {
        return value;
      }
    }
  }

}

export default find;
