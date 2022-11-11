import cors from 'cors'
import bodyParser from 'body-parser'
import createApolloMiddleware from './createApolloMiddleware.js'
import { RequestHandler } from 'express'
import { IncomingMessage, Server, ServerResponse } from 'http'
import AppConfig from '../../config/AppConfig.js'

export default async function createMiddlewares <
    Request extends typeof IncomingMessage = typeof IncomingMessage,
    Response extends typeof ServerResponse = typeof ServerResponse,
    > (httpServer: Server<Request, Response>, config: AppConfig): Promise<RequestHandler[]> {
  return [
    cors(),
    bodyParser.json()
  ]
}
