const { forEach } = require("..");
const { object, keys, Obj, own, proto } = require("./constants");

describe("forEach method", () => {

  test("should iterate properly", () => {

    const callback = jest.fn();

    forEach(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("should skip prototype properties", () => {

    const instance = new Obj();
    const callback = jest.fn();

    forEach(instance, callback);

    expect(callback).toHaveBeenCalledTimes(own.length);
    expect(callback).not.toHaveBeenCalledWith(expect.any(Function), proto);
    own.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, instance[key], key);
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = [];

    forEach.call(thisArg, object, function () {
      expect(this).toBe(thisArg);
    });

  });

  test("should pass extra arguments to callback", () => {

    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    forEach(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    );

  });

  test("should return void", () => {

    const result = forEach(object, () => { });

    expect(result).toBeUndefined();

  });

});
