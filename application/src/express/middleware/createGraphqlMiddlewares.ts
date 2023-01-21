import { RequestHandler } from 'express'
import { IncomingMessage, Server, ServerResponse } from 'http'
import AppConfig from '../../config/AppConfig.js'
import createApolloMiddleware from './createApolloMiddleware.js'
import createJsonBodyParserMiddleware from './createJsonBodyParserMiddleware.js'
import createCorsMiddleware from './createCorsMiddleware.js'

export default async function createGraphqlMiddlewares <
    Request extends typeof IncomingMessage = typeof IncomingMessage,
    Response extends typeof ServerResponse = typeof ServerResponse,
    > (httpServer: Server<Request, Response>, config: AppConfig): Promise<RequestHandler[]> {
  console.info('Creating middlewares')
  return [
    await createCorsMiddleware(config),
    await createJsonBodyParserMiddleware(),
    await createApolloMiddleware(httpServer, config)
  ]
}
