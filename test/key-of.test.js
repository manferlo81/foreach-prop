const { keyOf } = require("..");
const { Obj, protoPropName } = require("./vintage-class");

describe("keyOf method", () => {

  test("should throw on insufficient arguments", () => {

    // @ts-ignore
    expect(() => keyOf()).toThrow(TypeError);

    // @ts-ignore
    expect(() => keyOf({})).toThrow(TypeError);

  });

  test("should throw on non object", () => {

    const invalidObjects = [
      100,
      true,
      false,
      "",
      "string",
    ];

    invalidObjects.forEach((object) => {
      // @ts-ignore
      expect(() => keyOf(object, 100)).toThrow(TypeError);
    });

  });

  test("should return the first found key", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const keyOf1 = keyOf(object, 2);
    const keyOf2 = keyOf(object, 3);

    expect(keyOf1).toBe("b");
    expect(keyOf2).toBe("c");

  });

  test("should return null if not found", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = keyOf(object, "does-not-exist");

    expect(result).toBeNull();

  });

  test("should return null if not own property", () => {

    const object = new Obj();

    const result = keyOf(object, object[protoPropName]);

    expect(object).toHaveProperty(protoPropName);
    expect(object[protoPropName]).toBeDefined();
    expect(result).toBeNull();

  });

});
