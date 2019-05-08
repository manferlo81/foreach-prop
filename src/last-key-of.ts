import hasOwn from "./has-own";

function lastKeyOf<K extends keyof any, V>(object: Record<K, V>, value: V): K | null {

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
