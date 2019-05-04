import keyOf from "./key-of";

function includes(object, value) {
  return keyOf(object, value) !== null;
}

export default includes;
