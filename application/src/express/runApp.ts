import express from 'express'
import http from 'http'
import createApolloMiddleware from './middleware/createApolloMiddleware.js'
import createMiddlewares from './middleware/createMiddlewares.js'
import listenHttp from './listenHttp.js'
import createConfig from '../config/createConfig.js'

export default async function runApp (): Promise<void> {
  const config = createConfig()
  const app = express()
  const httpServer = http.createServer(app)

  const { path, port } = config.get('http')
  app.use(
    ...await createMiddlewares(httpServer, config)
  )
  app.use(
    await createApolloMiddleware(httpServer, config)
  )
  await listenHttp(httpServer, port)

  console.log('🚀 Server ready', { port, path })
}
