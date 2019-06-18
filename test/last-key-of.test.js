const { lastKeyOf } = require("..");
const { Obj, protoPropName } = require("./vintage-class");

describe("lastKeyOf method", () => {

  test("should throw on insufficient arguments", () => {

    // @ts-ignore
    expect(() => lastKeyOf()).toThrow(TypeError);

    // @ts-ignore
    expect(() => lastKeyOf({})).toThrow(TypeError);

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
      expect(() => lastKeyOf(object, 100)).toThrow(TypeError);
    });

  });

  test("should return the last found key", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const keyOf1 = lastKeyOf(object, 2);
    const keyOf2 = lastKeyOf(object, 3);

    expect(keyOf1).toBe("d");
    expect(keyOf2).toBe("c");

  });

  test("should return null if not found", () => {

    const object = { a: 1, b: 2, c: 3, d: 2 };

    const result = lastKeyOf(object, "does-not-exist");

    expect(result).toBeNull();

  });

  test("should return null if not own property", () => {

    const object = new Obj();

    const result = lastKeyOf(object, object[protoPropName]);

    expect(object).toHaveProperty(protoPropName);
    expect(object[protoPropName]).toBeDefined();
    expect(result).toBeNull();

  });


});
