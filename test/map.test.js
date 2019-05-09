const { map } = require("..");
const { object, keys, Obj, own, proto } = require("./constants");

describe("map method", () => {

  test("should iterate properly", () => {

    const callback = jest.fn();

    map(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("should skip prototype properties", () => {

    const instance = new Obj();
    const callback = jest.fn();

    map(instance, callback);

    expect(callback).toHaveBeenCalledTimes(own.length);
    expect(callback).not.toHaveBeenCalledWith(expect.any(Function), proto);
    own.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, instance[key], key);
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = [];

    map.call(thisArg, object, function () {
      expect(this).toBe(thisArg);
    });

  });

  test("should pass extra arguments to callback", () => {

    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    map(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    );

  });

  test("should return a new object", () => {

    const result = map(object, (val) => val);

    expect(typeof result).toBe("object");
    expect(result).toEqual(object);
    expect(result).not.toBe(object);

  });

  test("should return a mapped object", () => {

    const result = map(object, (val) => (val * 2));

    expect(Object.keys(result)).toEqual(keys);

    keys.forEach((key) => {
      expect(result[key]).toBe(object[key] * 2);
    });

  });

});
