import { every } from '../src'
import { createObjectWithProto } from './tools/create-object'
import { normalizeObject } from './tools/helpers'
import type { UnknownFunction } from './tools/types'
import { invalidCallbacks, invalidObjects } from './tools/values'

describe('every method', () => {

  test('should throw on insufficient arguments', () => {
    const __every = every as UnknownFunction
    const cases = [
      () => __every(),
      () => __every({}),
    ]
    cases.forEach((exec) => {
      expect(exec).toThrow(TypeError)
    })
  })

  test('should throw on non object', () => {
    invalidObjects.forEach((object) => {
      const exec = () => every(object as never, () => true)
      expect(exec).toThrow(TypeError)
    })
  })

  test('should throw on invalid predicate function', () => {
    invalidCallbacks.forEach((callback) => {
      const exec = () => every({}, callback as never)
      expect(exec).toThrow(TypeError)
    })
  })

  test('should skip prototype properties', () => {

    const protoProps = ['protoPropA', 'protoPropB'] as const
    const ownProps = ['ownPropA', 'ownPropB'] as const
    const instance = createObjectWithProto(protoProps, ownProps)

    const callback = jest.fn(() => true)

    every(instance, callback)

    expect(callback).toHaveBeenCalledTimes(ownProps.length)
    ownProps.forEach((ownKeyAndValue, index) => {
      expect(callback).toHaveBeenNthCalledWith(index + 1, ownKeyAndValue, ownKeyAndValue)
    })
    protoProps.forEach((protoKeyAndValue) => {
      expect(callback).not.toHaveBeenCalledWith(expect.anything(), protoKeyAndValue)
    })

  })

  test('should pass value and key to predicate function', () => {

    const { normalized, entries } = normalizeObject({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    })

    const predicate = jest.fn<true, [unknown, string]>(() => true)

    every(normalized, predicate)

    expect(predicate).toHaveBeenCalledTimes(entries.length)
    entries.forEach(([key, value], index) => {
      expect(predicate).toHaveBeenNthCalledWith(
        index + 1,
        value,
        key,
      )
    })

  })

  test('should pass this argument to predicate function', () => {

    const { normalized, entries } = normalizeObject({
      a: 1,
      b: 2,
    })

    const thisArg = {}
    const callback = jest.fn(function (this) {
      expect(this).toBe(thisArg)
      return true
    })

    every.call(thisArg, normalized, callback)

    expect(callback).toHaveBeenCalledTimes(entries.length)

  })

  test('should pass extra arguments to predicate function', () => {

    const { normalized, entries } = normalizeObject({ a: 1 })

    const callback = jest.fn()

    const extra1 = {}
    const extra2: never[] = []

    every(normalized, callback, extra1, extra2)

    expect(callback).toHaveBeenCalledTimes(entries.length)
    expect(callback).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(String),
      extra1,
      extra2,
    )

  })

  test('should return true if all pass', () => {

    const result = every({ a: 1, b: 2, c: 3, d: 4 }, (val) => {
      return val > 0
    })

    expect(result).toBe(true)

  })

  test('should return false if some pass', () => {

    const result = every({ a: 1, b: 2, c: 3, d: 4 }, (val) => {
      return val > 1
    })

    expect(result).toBe(false)

  })

  test('should return false if none pass', () => {

    const result = every({ a: 1, b: 2, c: 3, d: 4 }, (val) => {
      return val > 10
    })

    expect(result).toBe(false)

  })

  test('should exit as soon as one condition does\'t pass', () => {

    const callback = jest.fn((val: number) => {
      return val < 0
    })

    const result = every({ a: 1, b: 2, c: 3, d: 4 }, callback)

    expect(result).toBe(false)
    expect(callback).toHaveBeenCalledTimes(1)

  })

})
