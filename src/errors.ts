import { Anything } from './types';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
function createErrorFactory<T extends (...args: Anything[]) => TypeError>(template: string): T {
  return function (): TypeError {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments as ArrayLike<unknown>;
    return new TypeError(template.replace(/\$(\d+)/g, (_, i: string) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${args[+i]}`;
    }));
  } as T;
}

export const notEnoughArgs = createErrorFactory<(count: number, expected: number) => TypeError>('expected $1 arguments, got $0.');
export const invalidObject = createErrorFactory<(object: unknown) => TypeError>('$0 is not an object.');
export const invalidCallback = createErrorFactory<(callback: unknown) => TypeError>('$0 is not a function.');
export const invalidArray = createErrorFactory<(object: unknown) => TypeError>('$0 is not an array.');
