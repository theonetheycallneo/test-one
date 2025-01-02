import { handler } from '../../../../dist/index.js'

export default async function(req, res) {
  const { url } = req

  console.log('Request to url:', url)

  return handler(req, res)
}
