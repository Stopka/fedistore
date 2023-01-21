import cors from 'cors'
import { RequestHandler } from 'express'
import AppConfig from '../../config/AppConfig.js'

export default async function createCorsMiddleware (config: AppConfig): Promise<RequestHandler> {
  const corsConfig = config.get('cors')
  console.info('Creating cors middleware', { ...corsConfig })
  return cors({
    origin: corsConfig.allowedOrigins.includes('*') ? '*' : corsConfig.allowedOrigins
  })
}
