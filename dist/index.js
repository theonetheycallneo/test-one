import { serve } from 'one/serve'
export const handler = await serve()
export const { GET, POST, PUT, PATCH, OPTIONS } = handler
export default handler