import { expressMiddleware } from '@apollo/server/express4'
import createContextFactory from '../../graphql/context/createContextFactory.js'
import createGraphqlServer from '../../graphql/createGraphqlServer.js'
import { RequestHandler } from 'express'
import { IncomingMessage, Server, ServerResponse } from 'http'
import AppConfig from '../../config/AppConfig.js'

export default async function createApolloMiddleware <
    Request extends typeof IncomingMessage = typeof IncomingMessage,
    Response extends typeof ServerResponse = typeof ServerResponse,
    > (httpServer: Server<Request, Response>, config: AppConfig): Promise<RequestHandler> {
  const graphqlServer = await createGraphqlServer(httpServer)
  await graphqlServer.start()
  console.info('Started graphql server, creating graphql middleware')
  return expressMiddleware(
    graphqlServer,
    {
      context: await createContextFactory(config)
    }
  )
}
