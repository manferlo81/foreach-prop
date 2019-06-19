// @ts-check

const { forEach, reduce } = require("..");

describe("create callback", () => {

  test("should throw on invalid filter callback", () => {

    const object = { a: 1 };
    const invalidCallbacks = [
      {},
      [],
      true,
      false,
      0,
      null,
      "",
      "string",
    ];

    invalidCallbacks.forEach((callback) => {
      // @ts-ignore
      expect(() => forEach(object, callback)).toThrow(TypeError);
    });

  });

  test("should throw on invalid reduce callback", () => {

    const object = { a: 1 };
    const invalidCallbacks = [
      {},
      [],
      true,
      false,
      0,
      null,
      "",
      "string",
    ];

    invalidCallbacks.forEach((callback) => {
      // @ts-ignore
      expect(() => reduce(object, callback)).toThrow(TypeError);
    });

  });

  test("should pass 1 extra argument to filter callback", () => {

    const object = { a: 1 };
    const callback = jest.fn();
    const extra1 = {};

    forEach(object, callback, extra1);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      1,
      "a",
      extra1,
    );

  });

  test("should pass multiple extra arguments to filter callback", () => {

    const object = { a: 1 };
    const callback = jest.fn();
    const extra1 = {};
    const extra2 = [];

    forEach(object, callback, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      1,
      "a",
      extra1,
      extra2,
    );

  });

  test("should pass 1 extra argument to reduce callback", () => {

    const object = { a: 1 };
    const callback = jest.fn(r => r);
    const extra1 = {};

    // @ts-ignore
    reduce(object, callback, 0, extra1);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      1,
      "a",
      extra1,
    );

  });

  test("should pass multiple extra arguments to reduce callback", () => {

    const object = { a: 1 };
    const callback = jest.fn(r => r);
    const extra1 = {};
    const extra2 = [];

    // @ts-ignore
    reduce(object, callback, 0, extra1, extra2);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      1,
      "a",
      extra1,
      extra2,
    );

  });

});
