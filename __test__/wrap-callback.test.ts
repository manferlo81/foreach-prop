import { forEach, reduce } from '../src'
import { invalidCallbacks } from './tools/values'

describe('create callback', () => {

  test('should throw on invalid filter callback', () => {

    const object = { a: 1 }

    invalidCallbacks.forEach((callback) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(() => forEach(object, callback)).toThrow(TypeError)
    })

  })

  test('should throw on invalid reduce callback', () => {

    const object = { a: 1 }

    invalidCallbacks.forEach((callback) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(() => reduce(object, callback)).toThrow(TypeError)
    })

  })

  test('should pass 1 extra argument to filter callback', () => {

    const object = { a: 1 }
    const callback = jest.fn()
    const extra1 = {}

    forEach(object, callback, extra1)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(
      1,
      'a',
      extra1,
    )

  })

  test('should pass multiple extra arguments to filter callback', () => {

    const object = { a: 1 }
    const callback = jest.fn()
    const extra1 = {}
    const extra2: any[] = []

    forEach(object, callback, extra1, extra2)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(
      1,
      'a',
      extra1,
      extra2,
    )

  })

  test('should pass 1 extra argument to reduce callback', () => {

    const object = { a: 1 }
    const callback = jest.fn((r) => r)
    const extra1 = {}

    reduce(object, callback, 0, extra1)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      1,
      'a',
      extra1,
    )

  })

  test('should pass multiple extra arguments to reduce callback', () => {

    const object = { a: 1 }
    const callback = jest.fn((r) => r)
    const extra1 = {}
    const extra2: any[] = []

    reduce(object, callback, 0, extra1, extra2)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      1,
      'a',
      extra1,
      extra2,
    )

  })

})
