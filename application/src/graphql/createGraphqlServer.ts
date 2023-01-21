import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import schema from './schema/index.js'
import { IncomingMessage, Server, ServerResponse } from 'http'

export default async function createGraphqlServer<
    Request extends typeof IncomingMessage = typeof IncomingMessage,
    Response extends typeof ServerResponse = typeof ServerResponse,
    > (
  httpServer: Server<Request, Response>
): Promise<ApolloServer> {
  console.info('Creating graphql server')
  return new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ]
  })
}
