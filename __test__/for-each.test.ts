import { forEach } from '../src'
import { createObjectWithProto } from './tools/create-object'
import { normalizeObject } from './tools/helpers'
import { UnknownFunction } from './tools/types'
import { invalidCallbacks, invalidObjects } from './tools/values'

describe('forEach method', () => {

  test('should throw on insufficient arguments', () => {

    const __forEach = forEach as UnknownFunction

    const cases = [
      () => {
        __forEach()
      },
      () => {
        __forEach({})
      },
    ]

    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError)
    })

  })

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => {
        forEach(object as never, () => null)
      }
      expect(exec).toThrow(TypeError)
    })
  })

  test('should throw on invalid callback function', () => {
    invalidCallbacks.forEach((callback) => {
      const exec = () => {
        forEach({}, callback as never)
      }
      expect(exec).toThrow(TypeError)
    })
  })

  test('should skip prototype properties', () => {

    const ownProps = ['ownPropA', 'ownPropB'] as const
    const protoProps = ['protoPropA', 'protoPropB'] as const
    const instance = createObjectWithProto(protoProps, ownProps)

    const callback = jest.fn()

    forEach(instance, callback)

    expect(callback).toHaveBeenCalledTimes(ownProps.length)
    ownProps.forEach((ownKeyAndValue, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, ownKeyAndValue, ownKeyAndValue)
    })
    protoProps.forEach((protoKeyAndValue) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), protoKeyAndValue)
    })

  })

  test('should pass key and value to callback function', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: 2, c: 3, d: 4 })
    const callback = jest.fn()

    forEach(normalized, callback)

    expect(callback).toHaveBeenCalledTimes(entries.length)

    entries.forEach(([key, value], index) => {
      expect(callback).toHaveBeenNthCalledWith(
        index + 1,
        value,
        key,
      )
    })

  })

  test('should pass this argument to callback function', () => {

    const { normalized, entries } = normalizeObject({ a: 1, b: 2 })

    const thisArg = {}
    const callback = jest.fn(function cb(this: unknown) {
      expect(this).toBe(thisArg)
    })

    forEach.call(thisArg, normalized, callback)

    expect(callback).toHaveBeenCalledTimes(entries.length)

  })

  test('should pass extra arguments to callback function', () => {

    const object = { a: 1 }

    const callback = jest.fn()

    const extra1 = {}
    const extra2: never[] = []

    forEach(object, callback, extra1, extra2)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    )

  })

  test('should return undefined', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 }
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const result = forEach(object, () => null)
    expect(result).toBeUndefined()
  })

})
