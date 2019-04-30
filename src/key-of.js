import hasOwn from "./has-own";

function keyOf(object, value) {

  for (let key in object) {
    if (
      hasOwn.call(object, key) &&
      object[key] === value
    ) {
      return key;
    }
  }

  return null;

}

export default keyOf;
