import { validateFunction } from '../src/tools/validate';
import { invalidCallbacks } from './tools/values';

describe('validateFunction function', () => {

  it('should return input if it\'s a function', () => {
    const callbacks = [
      () => true,
    ];
    callbacks.forEach((callback) => {
      expect(validateFunction(callback)).toBe(callback);
    });
  });

  it('should throw if input is not a function', () => {
    invalidCallbacks.forEach((invalid) => {
      const validate = () => validateFunction(invalid);
      expect(validate).toThrow(TypeError);
    });
  });

});
