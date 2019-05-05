const { findKey } = require("..");

describe("findKey method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
  };
  const keys = Object.keys(object);

  test("findKey enumerates properly", () => {

    const callback = jest.fn();

    findKey(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("findKey passes this argument to callback", () => {

    const thisArg = [];
    const callback = jest.fn(function () {
      expect(this).toBe(thisArg);
    });


    findKey.call(thisArg, object, callback);

    expect(keys.length).toBeGreaterThan(0);
    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("findKey passes extra arguments to callback", () => {

    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    findKey(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key, extra1, extra2);
    });

  });

  test("findKey should return the found key", () => {

    const result = findKey(object, (val, key) => {
      return val === 2 && key === "b";
    });

    expect(result).toBe("b");

  });

  test("findKey should return null if not found", () => {

    const result = findKey(object, (val, key) => {
      return key === "does-not-exist";
    });

    expect(result).toBeNull();

  });

});
