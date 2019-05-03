const { map } = require("..");

describe("map method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
  };
  const keys = Object.keys(object);

  test("map enumerates properly", () => {

    const callback = jest.fn();

    map(object, callback);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("map passes extra args", () => {

    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    map(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key, extra1, extra2);
    });

  });

  test("map passes this arg", () => {

    const thisArg = [];
    const callback = jest.fn(function () {
      expect(this).toBe(thisArg);
    });

    map.call(thisArg, object, callback);

    expect(keys.length).toBeGreaterThan(0);
    expect(callback).toHaveBeenCalledTimes(keys.length);

    keys.forEach((key, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
    });

  });

  test("map should return a new object", () => {

    const result = map(object, (val) => {
      return val;
    });

    expect(typeof result).toBe("object");

    expect(result).toMatchObject(object);
    expect(result).not.toBe(object);

  });

});
