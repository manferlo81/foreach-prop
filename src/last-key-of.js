import hasOwn from "./has-own";

function lastKeyOf(object, value) {

  let result = null;

  for (const key in object) {
    if (
      hasOwn.call(object, key) &&
      object[key] === value
    ) {
      result = key;
    }
  }

  return result;

}

export default lastKeyOf;
