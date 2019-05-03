import toArray from "args-to-arr";
import hasOwn from "./has-own";

function forEach(object, callback) {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      callback.call(this, object[key], key, ...extra);
    }
  }

}

export default forEach;
