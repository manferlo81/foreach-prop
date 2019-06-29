import { keyOf } from "../src";
import invalidObjects from "./helpers/invalid-objects";
import { Obj, protoPropA } from "./helpers/vintage-class";

describe("keyOf method", () => {

  test("should throw on insufficient arguments", () => {

    // @ts-ignore
    expect(() => keyOf()).toThrow(TypeError);

    // @ts-ignore
    expect(() => keyOf({})).toThrow(TypeError);

  });

  test("should throw on non object", () => {

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

    // @ts-ignore
    const object = new Obj();

    // tslint:disable-next-line: no-console
    console.log(object);

    const result = keyOf(object, object[protoPropA]);

    expect(object).toHaveProperty(protoPropA);
    expect(object[protoPropA]).toBeDefined();
    expect(result).toBeNull();

  });

});
