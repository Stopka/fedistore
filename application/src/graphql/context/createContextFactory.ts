import { ContextFunction } from 'apollo-server-core/src/types.js'
import { Request } from 'express'
import createAuthorization from '../../authorization/createAuthorization.js'
import createElasticClient from '../../elastic/createElasticClient.js'
import AppConfig from '../../config/AppConfig.js'
import assertFeedIndex from '../../elastic/index/assertFeedIndex.js'
import assertNodeIndex from '../../elastic/index/assertNodeIndex.js'
import Context from './Context.js'

export default async function createContextFactory (config: AppConfig): Promise<ContextFunction<{ req: Request }, Context>> {
  console.info('Creating graphql context factory')
  const contextTemplate: Omit<Context, 'authorization'> = {
    elasticClient: await createElasticClient(config.get('elastic')),
    defaultPaging: config.get('defaultPaging'),
    indicies: {
      node: 'node',
      feed: 'feed'
    }
  }

  await assertNodeIndex(contextTemplate.elasticClient, contextTemplate.indicies.node)
  await assertFeedIndex(contextTemplate.elasticClient, contextTemplate.indicies.feed)

  return async ({ req }): Promise<Context> => {
    console.info('Creating graphql context')
    return {
      ...contextTemplate,
      authorization: await createAuthorization(config.get('access'), req)
    }
  }
}