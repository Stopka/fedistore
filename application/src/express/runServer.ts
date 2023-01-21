import express from 'express'
import http from 'http'
import AppConfig from '../config/AppConfig.js'
import createGraphqlMiddlewares from './middleware/createGraphqlMiddlewares.js'
import listenHttp from './listenHttp.js'

export default async function runServer (config: AppConfig): Promise<void> {
  console.info('Starting server')
  const app = express()
  const httpServer = http.createServer(app)

  const { path, port } = config.get('http')
  app.use(
    path,
    ...await createGraphqlMiddlewares(httpServer, config)
  )
  await listenHttp(httpServer, port)

  console.info('🚀 Server ready', { port, path })
}
