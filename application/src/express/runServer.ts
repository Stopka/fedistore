import express from 'express'
import http from 'http'
import AppConfig from '../config/AppConfig.js'
import createMiddlewares from './middleware/createMiddlewares.js'
import listenHttp from './listenHttp.js'

export default async function runServer (config: AppConfig): Promise<void> {
  console.info('Starting server')
  const app = express()
  const httpServer = http.createServer(app)

  const { path, port } = config.get('http')
  app.use(
    ...await createMiddlewares(httpServer, config)
  )
  await listenHttp(httpServer, port)

  console.info('🚀 Server ready', { port, path })
}
