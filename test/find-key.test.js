const { findKey } = require("..");
const { Obj, ownProps, protoProps } = require("./vintage-class");

describe("findKey method", () => {

  test("should throw on insufficient arguments", () => {

    expect(() => {
      findKey();
    }).toThrow(TypeError);

    expect(() => {
      findKey({});
    }).toThrow(TypeError);

  });

  test("should throw on non object", () => {

    expect(() => {
      findKey(100, () => { });
    }).toThrow(TypeError);

  });

  test("should iterate properly", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const keys = Object.keys(object);
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

    expect(callback).toHaveBeenCalledTimes(ownProps.length);
    protoProps.forEach((key) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), key);
    });
    ownProps.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, instance[key], key);
    });

  });

  test("should pass this argument to callback", () => {

    const thisArg = [];
    const object = { a: 1 };
    const callback = jest.fn(function () {
      expect(this).toBe(thisArg);
    });

    findKey.call(thisArg, object, callback);

    expect(callback).toHaveBeenCalledTimes(1);

  });

  test("should pass multiple extra arguments to callback", () => {

    const value = 1;
    const key = "a";
    const object = { [key]: value };

    const callback = jest.fn();

    const extra1 = {};
    const extra2 = [];

    findKey(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      value,
      key,
      extra1,
      extra2,
    );

  });

  test("should return the found key", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const expectedResult = "b";

    const result = findKey(object, (val, key) => {
      return key === expectedResult;
    });

    expect(result).toBe(expectedResult);

  });

  test("should return null if not found", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = findKey(object, (val) => {
      return val === "does-not-exist";
    });

    expect(result).toBeNull();

  });

});
