import { serve } from 'one/serve'
const handler = await serve()
export const { GET, POST, PUT, PATCH, OPTIONS } = handler