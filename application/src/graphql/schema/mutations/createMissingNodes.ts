import { extendType, list, nonNull, nullable, stringArg } from 'nexus'
import handleCreateMissingNodes from '../../../elastic/handlers/node/createMissingNodes.js'
import getNode from '../../../elastic/handlers/node/getNode.js'
import { Context } from '../../context/index.js'

export const createMissingNodes = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('createMissingNodes', {
      description: 'Creates new nodes with entered node domains. If node with the domain already exists, it is skipped.',
      type: 'Int',
      args: {
        nodeDomains: nonNull(list(nonNull(stringArg({
          description: 'List of node domains to be created'
        })))),
        discoveredByDomain: nullable(stringArg({
          description: 'On witch domain was this node found'
        }))
      },
      resolve: async (event, { nodeDomains, discoveredByDomain, crawlingDepth }, { elasticClient, indicies, authorization, crawlingVersion }: Context): Promise<number> => {
        await authorization.assertCanWrite()
        console.info('createMissingNodes', { nodeDomains })
        const node = discoveredByDomain !== undefined ? await getNode(elasticClient, indicies.node, discoveredByDomain) : undefined
        return await handleCreateMissingNodes(
          elasticClient,
          indicies.node,
          nodeDomains,
          discoveredByDomain ?? undefined,
          (node?.crawlingDepth ?? -1) + 1,
          crawlingVersion
        )
      }
    })
  }
})
