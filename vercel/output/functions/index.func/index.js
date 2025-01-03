// import './polyfill-require-in-esm.mjs'

import { createRequire } from 'node:module';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
globalThis.require = createRequire(__filename);

import { handler as oneHandler } from '../../../../dist/index.js'

export default async function handler(req, res) {
  const { url } = req

  console.log('Request to url:', url)

  return await oneHandler(req, res)
}
