import hasOwn from "./has-own";

function includes(object, value) {

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      object[key] === value
    ) {
      return true;
    }
  }

  return false;

}

export default includes;
