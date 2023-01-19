import cors from 'cors'
import { RequestHandler } from 'express'
import AppConfig from '../../config/AppConfig.js'

export default function createCorsMiddleware (config: AppConfig): RequestHandler {
  const corsConfig = config.get('cors')
  console.info('Creating cors middleware', { ...corsConfig })
  return cors({
    origin: corsConfig.allowedOrigins.includes('*') ? '*' : corsConfig.allowedOrigins
  })
}
