const { forEach } = require("..");

const object = {
  a: 1,
  b: 2,
  c: 3,
};

test("enumerate properly", () => {

  const callback = jest.fn();
  const keys = Object.keys(object);

  forEach(object, callback);

  expect(callback).toHaveBeenCalledTimes(keys.length);

  keys.forEach((key, index) => {
    expect(callback).toHaveBeenNthCalledWith(index + 1, object[key], key);
  });

});

test("forEach should return void", () => {

  const result = forEach(object, (val, key) => {
    if (val === 2 && key === "b") {
      return true;
    }
  });

  expect(result).toBeUndefined();

});
