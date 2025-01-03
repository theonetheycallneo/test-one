import { handler as oneHandler } from '../../../../dist/index.js'

export default function handler(req, res) {
  const { url } = req

  console.log('Request to url:', url)

  return oneHandler(req, res)
}
