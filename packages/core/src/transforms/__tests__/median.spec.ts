import { median } from '../median'
import { TransformFactoryContext } from '../../types'
import { applyTransforms } from '../../index'
import sharp, { Sharp } from 'sharp'
import { join } from 'path'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { describe, beforeEach, beforeAll, vi, expect, test, it } from 'vitest'
import { consoleLogger } from '../../lib/logger'

expect.extend({ toMatchImageSnapshot })

describe('median', () => {
  let dirCtx: TransformFactoryContext
  beforeAll(() => {
    dirCtx = { useParam: vi.fn, manualSearchParams: new URLSearchParams(), logger: consoleLogger }
  })

  test('keyword "median"', () => {
    var res = median({ median: '3' }, dirCtx)

    expect(res).toBeInstanceOf(Function)
  })

  test('missing', () => {
    var res = median({}, dirCtx)

    expect(res).toBeUndefined()
  })

  describe('arguments', () => {
    test('invalid', () => {
      var res = median({ median: 'invalid' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('empty', () => {
      var res = median({ median: '' }, dirCtx)

      expect(res).toBeUndefined()
    })

    test('integer', () => {
      var res = median({ median: '3' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })

    it('rounds float to int', () => {
      var res = median({ median: '3.5' }, dirCtx)

      expect(res).toBeInstanceOf(Function)
    })
  })

  describe('transform', () => {
    let img: Sharp
    beforeEach(() => {
      img = sharp(join(__dirname, '../../__tests__/__fixtures__/pexels-allec-gomes-5195763.png'))
    })

    test('3', async () => {
      var { image } = await applyTransforms([median({ median: '3' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })

    test('5', async () => {
      var { image } = await applyTransforms([median({ median: '5' }, dirCtx)!], img)

      expect(await image.toBuffer()).toMatchImageSnapshot()
    })
  })
})
