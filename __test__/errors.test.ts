import { errorNotCallback, errorNotEnoughArgs, errorNotObject } from '../src/tools/errors';

describe('errors', () => {

  test('should create not enough arguments error', () => {
    const error = errorNotEnoughArgs(0, 3);
    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toBe('expected 3 arguments, got 0.');
  });

  test('should create invalid object error', () => {
    const error = errorNotObject('string');
    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toBe('string is not an object.');
  });

  test('should create invalid callback error', () => {
    const error = errorNotCallback('string');
    expect(error).toBeInstanceOf(TypeError);
    expect(error.message).toBe('string is not a function.');
  });

});
