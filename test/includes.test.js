const { includes } = require("..");

describe("includes method", () => {

  const object = {
    a: 1,
    b: 2,
    c: 3,
    d: 2,
  };

  test("includes should return true if found", () => {

    const result = includes(object, 3);

    expect(result).toBe(true);

  });

  test("includes should return false if not found", () => {

    const result = includes(object, "does-not-exist");

    expect(result).toBe(false);

  });

});
