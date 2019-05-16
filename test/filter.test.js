const { filter } = require("..");
const { Obj, ownProps, protoProps } = require("./vintage-class");

describe("filter method", () => {

  test("should iterate properly", () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const keys = Object.keys(object);
    const callback = jest.fn();

    filter(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("should skip prototype properties", () => {

    const instance = new Obj();
    const callback = jest.fn();

    filter(instance, callback);

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
    const object = { a: 1, b: 2, c: 3, d: 4 };
    const count = Object.keys(object).length;
    const callback = jest.fn(function () {
      expect(this).toBe(thisArg);
    });

    filter.call(thisArg, object, callback);

    expect(callback).toHaveBeenCalledTimes(count);

  });

  test("should pass extra arguments to callback", () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const keys = Object.keys(object);
    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    filter(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);
    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        object[key],
        key,
        extra1,
        extra2,
      );
    });

  });

  test("should return a new object", () => {

    const object = { a: 1, b: 2, c: 3, d: 4 };
    const count = Object.keys(object).length;
    const callback = jest.fn(() => true);
    const result = filter(object, callback);

    expect(callback).toHaveBeenCalledTimes(count);
    expect(typeof result).toBe("object");
    expect(result).toEqual(object);
    expect(result).not.toBe(object);

  });

  test("should return a filtered object", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };
    const count = Object.keys(object).length;
    const callback = jest.fn((val) => {
      return val >= 2 && val <= 3;
    });
    const expectedResult = { b: 2, c: 3, d: 2 };

    const result = filter(object, callback);

    expect(callback).toHaveBeenCalledTimes(count);
    expect(result).toEqual(expectedResult);

  });

});
