import type { TransformOption } from '../types.js'
import { METADATA } from '../lib/metadata.js'

export interface LosslessOptions {
  lossless: '' | 'true'
}

export let getLossless: TransformOption<LosslessOptions> = ({ lossless }, image) => {
  if (lossless !== '' && lossless !== 'true') return

  image[METADATA].lossless = true

  return true
}
