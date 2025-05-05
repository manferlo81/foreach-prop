/* eslint-disable @typescript-eslint/restrict-template-expressions */

export function createErrorFunction<F extends (...args: never[]) => string>(createMessage: F): (...args: Parameters<F>) => TypeError {
  return (...args) => new TypeError(createMessage(...args))
}

export const errorIsNot = createErrorFunction((value: unknown, expected: string) => `${value} is not ${expected}.`)
export const errorNotEnoughArgs = createErrorFunction((count: number, expected: number) => `expected ${expected} arguments, got ${count}.`)

export const errorNotObject = (object: unknown) => errorIsNot(object, 'an object')
export const errorNotCallback = (callback: unknown) => errorIsNot(callback, 'a function')
