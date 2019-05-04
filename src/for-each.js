import toArray from "args-to-arr";
import hasOwn from "./has-own";
import callItBack from "./call-it-back";

function forEach(object, callback) {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (hasOwn.call(object, key)) {
      callItBack(callback, this, object, key, extra);
    }
  }

}

export default forEach;
