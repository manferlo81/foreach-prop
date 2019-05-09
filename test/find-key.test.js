const { findKey } = require("..");
const { object, keys, Obj, own, proto } = require("./constants");

describe("findKey method", () => {

  test("should iterate properly", () => {

    const callback = jest.fn();

    findKey(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("should skip prototype properties", () => {

    const instance = new Obj();
    const callback = jest.fn();

    findKey(instance, callback);

    expect(callback).toHaveBeenCalledTimes(own.length);
    expect(callback).not.toHaveBeenCalledWith(expect.any(Function), proto);
    own.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, instance[key], key);
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = [];

    findKey.call(thisArg, object, function () {
      expect(this).toBe(thisArg);
    });

  });

  test("should pass extra arguments to callback", () => {

    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    findKey(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    );

  });

  test("should return the found key", () => {

    const expectedKey = "b";

    const result = findKey(object, (val, key) => {
      return key === expectedKey;
    });

    expect(result).toBe(expectedKey);

  });

  test("should return null if not found", () => {

    const result = findKey(object, (val) => {
      return val === "does-not-exist";
    });

    expect(result).toBeNull();

  });

});
