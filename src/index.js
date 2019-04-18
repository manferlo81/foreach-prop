let hasOwn;

function eachProp(object, callback, ...rest) {

  if (!hasOwn) {
    hasOwn = Object.prototype.hasOwnProperty;
  }

  for (let key in object) {
    if (
      hasOwn.call(object, key) &&
      callback.call(this, object[key], key, ...rest)
    ) {
      return key;
    }
  }

  return null;

}

export default eachProp;
