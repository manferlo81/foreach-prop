const { map } = require("..");

describe("map", () => {

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

  test("map should return a new object", () => {

    const result = map(object, (val) => {
      return val;
    });

    expect(typeof result).toBe("object");
    expect(result).not.toBe(object);
    expect(result).toMatchObject(object);

  });

});
