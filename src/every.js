import toArray from "args-to-arr";
import hasOwn from "./has-own";

function some(object, callback) {

  const extra = toArray(arguments, 2);

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      !callback.call(this, object[key], key, ...extra)
    ) {
      return false;
    }
  }

  return true;

}

export default some;
