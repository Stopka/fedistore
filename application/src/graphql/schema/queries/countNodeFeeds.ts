import { extendType, nonNull, stringArg } from 'nexus'
import Feed from '../../../elastic/types/Feed.js'
import { Context } from '../../context/index.js'
import { NodeStats } from '../types/index.js'

interface Aggregation {
  buckets: Array<{
    key: 'account' | 'channel'
    // eslint-disable-next-line camelcase
    doc_count: number
  }>
}

export const countNodeFeeds = extendType({
  type: 'Query',
  definition (t) {
    t.field('countNodeFeeds', {
      type: NodeStats,
      args: {
        nodeDomain: nonNull(stringArg())
      },
      resolve: async (event, { domain }, { elasticClient, indicies }: Context) => {
        console.info('countNodeFeeds', { domain })
        await elasticClient.indices.refresh({ index: indicies.feed })
        const response = await elasticClient.search<Feed>({
          index: indicies.feed,
          query: {
            term: { domain }
          },
          size: 0,
          aggs: {
            types: {
              terms: {
                field: 'type'
              }
            }
          }
        })
        const types = response?.aggregations?.types as Aggregation
        const result = {
          channel: 0,
          account: 0
        }
        types.buckets.forEach((item) => {
          result[item.key] += item.doc_count
        })
        return result
      }
    })
  }
})
