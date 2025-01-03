import './polyfill-require-in-esm.mjs'
import { handler as oneHandler } from '../../../../dist/index.js'

export default async function handler(req, res) {
  const { url } = req

  console.log('Request to url:', url)

  return await oneHandler(req, res)
}
