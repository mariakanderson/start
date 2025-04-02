import { resolveConfigs } from '../lib/resolve-configs'
import { builtinOutputFormats } from '../'
import { describe, test, it, expect } from 'vitest'

describe('generateConfigs', () => {
  it('accepts and array of entries', () => {
    let e: [string, string[]][] = [
      ['foo', ['bar']],
      ['hello', ['world']],
      ['width', ['300']]
    ]

    expect(() => resolveConfigs(e, builtinOutputFormats)).not.toThrow()
  })

  it('returns an array of objects', () => {
    let e: [string, string[]][] = [
      ['foo', ['bar']],
      ['hello', ['world']],
      ['width', ['300']]
    ]

    let res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toBeInstanceOf(Array)
    expect(res[0]).toBeInstanceOf(Object)
  })

  it('returns a single object if only single arguments are used', () => {
    let e: [string, string[]][] = [
      ['foo', ['bar']],
      ['hello', ['world']],
      ['width', ['300']]
    ]

    let res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toBeInstanceOf(Array)
    expect(res).toHaveLength(1)
  })

  it('returns a single object if only single arguments are used', () => {
    let e: [string, string[]][] = [
      ['foo', ['bar']],
      ['hello', ['world']],
      ['width', ['300', '400']]
    ]

    let res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toBeInstanceOf(Array)
    expect(res).toHaveLength(2)
  })

  test('the returned array length equals the product of all arguments', () => {
    {
      let e: [string, string[]][] = [['width', ['300', '400']]]

      let res = resolveConfigs(e, builtinOutputFormats)

      expect(res).toHaveLength(2)
    }
    {
      let e: [string, string[]][] = [
        ['width', ['300', '400']],
        ['test', ['foo', 'bar']]
      ]

      let res = resolveConfigs(e, builtinOutputFormats)

      expect(res).toHaveLength(4)
    }
    {
      let e: [string, string[]][] = [
        ['width', ['300', '400']],
        ['test', ['foo', 'bar']],
        ['height', ['100', '700']]
      ]

      let res = resolveConfigs(e, builtinOutputFormats)

      expect(res).toHaveLength(8)
    }
  })

  test('returned objects all have string values', () => {
    let e: [string, string[]][] = [
      ['width', ['300', '400']],
      ['height', ['100', '700']]
    ]

    let res = resolveConfigs(e, builtinOutputFormats)

    for (let options of res) {
      for (let key in options) {
        expect(typeof options[key]).toBe('string')
      }
    }
  })

  test('the returned array contains the product of all arguments', () => {
    let e: [string, string[]][] = [
      ['width', ['300', '400']],
      ['test', ['foo', 'bar']],
      ['height', ['100', '700']]
    ]

    let expected = [
      { width: '300', test: 'foo', height: '100' },
      { width: '300', test: 'foo', height: '700' },
      { width: '300', test: 'bar', height: '100' },
      { width: '300', test: 'bar', height: '700' },
      { width: '400', test: 'foo', height: '100' },
      { width: '400', test: 'foo', height: '700' },
      { width: '400', test: 'bar', height: '100' },
      { width: '400', test: 'bar', height: '700' }
    ]

    let res = resolveConfigs(e, builtinOutputFormats)

    expected.forEach((entry) => {
      expect(res).toContainEqual(entry)
    })
  })

  test('output transforms are ignored', () => {
    let e: [string, string[]][] = [
      ['width', ['300', '400']],
      ['height', ['100', '700']],
      ['metadata', ['width', 'height']]
    ]

    let res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toHaveLength(4)
  })

  test('only output transforms', () => {
    let e: [string, string[]][] = [['metadata', ['width', 'height']]]

    let res = resolveConfigs(e, builtinOutputFormats)

    expect(res).toHaveLength(1)
  })
})
