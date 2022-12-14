import { arg, extendType, nonNull } from 'nexus'
import { StatsList, StatsQueryInput } from '../types/index.js'
import { Context } from '../../context/index.js'
import SortingInputType from '../../types/SortingInput.js'
import { StatsSortingByValues } from '../../values/StatsSortingByValues.js'

type ListStatsSortByTuple = typeof StatsSortingByValues
type ListStatsSortBy = ListStatsSortByTuple[number]

interface ListStatsArgs {
  query: SortingInputType<ListStatsSortBy>
}

export interface StatsType {
  softwareName: string
  nodeCount: number
  accountFeedCount: number
  channelFeedCount: number
}

export interface ListStatsType {
  items: StatsType[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getSort = (query: SortingInputType<ListStatsSortBy>) => {
  switch (query.sortBy) {
    case 'nodeCount':
      return { _count: { order: query.sortWay } }
    case 'accountFeedCount':
      return { accountFeedCount: { order: query.sortWay } }
    case 'channelFeedCount':
      return { channelFeedCount: { order: query.sortWay } }
    case 'softwareName':
    default:
      return { _key: { order: query.sortWay } }
  }
}

export const listStats = extendType({
  type: 'Query',
  definition (t) {
    t.field('listStats', {
      type: StatsList,
      args: {
        query: arg({
          type: nonNull(StatsQueryInput),
          default: { sortBy: 'nodeCount', sortWay: 'desc' }
        })
      },
      resolve: async (event, { query }: ListStatsArgs, { elasticClient, indicies }: Context): Promise<ListStatsType> => {
        console.info('Searching stats', { query })

        const results = await elasticClient.search({
          index: indicies.node,
          query: {
            match_all: {}
          },
          aggs: {
            software: {
              terms: {
                field: 'softwareName',
                size: 1000,
                min_doc_count: 2
              },
              aggs: {
                accountFeedCount: {
                  sum: {
                    field: 'accountFeedCount'
                  }
                },
                channelFeedCount: {
                  sum: {
                    field: 'channelFeedCount'
                  }
                },
                sort: {
                  bucket_sort: {
                    sort: [
                      // @ts-expect-error
                      getSort(query)
                    ]
                  }
                }
              }
            }
          }
        })
        interface Aggregation {
          buckets: Array<{
            key: string
            // eslint-disable-next-line camelcase
            doc_count: number
            accountFeedCount: { value: number }
            channelFeedCount: { value: number }
          }>
        }
        const software = results?.aggregations?.software as Aggregation
        return {
          items: software.buckets.map(bucket => {
            return {
              softwareName: bucket.key,
              nodeCount: bucket.doc_count,
              accountFeedCount: bucket.accountFeedCount.value,
              channelFeedCount: bucket.channelFeedCount.value
            }
          })
        }
      }
    })
  }
})
