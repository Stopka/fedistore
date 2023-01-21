import { extendType, list, nonNull, stringArg } from 'nexus'
import deleteDomainFeeds from '../../../elastic/handlers/feed/deleteDomainFeeds.js'
import handleDeleteDomainFeeds from '../../../elastic/handlers/node/deleteDomainNodes.js'
import { Context } from '../../context/index.js'

export const deleteDomainNodes = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('deleteDomainNodes', {
      description: ' Deletes nodes and it\'s feeds by domain name',
      type: 'Int',
      args: {
        nodeDomains: nonNull(list(nonNull(stringArg({
          description: 'List of node domains to be deleted'
        }))))
      },
      resolve: async (event, { nodeDomains }, { elasticClient, indicies, authorization }: Context): Promise<number> => {
        await authorization.assertCanWrite()
        console.info('deleteDomainNodes', { nodeDomains })
        await deleteDomainFeeds(elasticClient, indicies.feed, nodeDomains)
        return await handleDeleteDomainFeeds(elasticClient, indicies.node, nodeDomains)
      }
    })
  }
})
