function callItBack(callback, thisArg, object, key, extra) {
  return callback.call(
    thisArg,
    object[key],
    key,
    ...extra
  );
}

export default callItBack;
