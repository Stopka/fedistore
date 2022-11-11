import { ApolloServer } from 'apollo-server-express'
import schema from './schema/index.js'
import createContext from './context/createContext.js'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { IncomingMessage, Server, ServerResponse } from 'http'
import AppConfig from '../config/AppConfig.js'

export default async function createGraphqlServer<
    Request extends typeof IncomingMessage = typeof IncomingMessage,
    Response extends typeof ServerResponse = typeof ServerResponse,
    > (
  httpServer: Server<Request, Response>,
  config: AppConfig
): Promise<ApolloServer> {
  return new ApolloServer({
    schema,
    context: await createContext(config),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer })
    ]
  })
}
