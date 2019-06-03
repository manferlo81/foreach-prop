const { forEach } = require("..");

describe("create callback", () => {

  test("should pass 1 extra argument to callback", () => {

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

  test("should pass multiple extra arguments to callback", () => {

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

});
