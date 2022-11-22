import { arg, extendType, nonNull } from 'nexus'
import { FeedList, FeedQueryInput, PagingInput } from '../types/index.js'
import { Context } from '../../context/index.js'
import Feed from '../../../elastic/types/Feed.js'
import prepareSimpleQuery from '../../../elastic/prepareSimpleQuery.js'
import { PagingInputType } from '../../types/PagingInputType.js'

interface Args {
  paging: PagingInputType
  query: {
    search: string
  }
}

export const listFeeds = extendType({
  type: 'Query',
  definition (t) {
    t.field('listFeeds', {
      type: FeedList,
      args: {
        paging: arg({
          type: nonNull(PagingInput),
          default: { page: 0 }
        }),
        query: arg({
          type: nonNull(FeedQueryInput),
          default: { search: '' }
        })
      },
      resolve: async (event, { paging, query }: Args, { elasticClient, defaultPaging, indicies }: Context) => {
        console.info('Searching feeds', { paging, query })
        if (query.search === '') {
          return {
            paging: { hasNext: false },
            items: []
          }
        }
        const oneYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        const results = await elasticClient.search<Feed>({
          index: indicies.feed,
          size: defaultPaging.limit + 1,
          from: paging.page * defaultPaging.limit,
          query: {
            function_score: {
              functions: [
                {
                  filter: { term: { type: 'account' } },
                  weight: 1.2
                },
                {
                  filter: { range: { statusesCount: { lt: 3 } } },
                  weight: 0.7
                },
                {
                  filter: { range: { lastStatusAt: { lt: oneYearsAgo.getTime() } } },
                  weight: 0.5
                },
                {
                  filter: { term: { bot: true } },
                  weight: 0.9
                },
                {
                  script_score: {
                    script: {
                      source: "Math.max(1,Math.log(1 + doc['followersCount'].value) / 1 + 1)"
                    }
                  }
                },
                {
                  filter: { range: { followingCount: { lt: 10 } } },
                  weight: 0.8
                },
                {
                  filter: { range: { followersCount: { lte: 1 } } },
                  weight: 0.1
                },
                {
                  filter: { term: { locked: true } },
                  weight: 0.05
                }
              ],
              query: {
                simple_query_string: {
                  query: prepareSimpleQuery(query.search),
                  fields: [
                    'name^3',
                    'domain^3',
                    'displayName^3',
                    'description^2',
                    'field.value^2',
                    'field.name^1'
                  ],
                  default_operator: 'AND'
                }
              }
            }
          }
        })

        return {
          paging: {
            hasNext: typeof results.hits.hits[defaultPaging.limit] !== 'undefined'
          },
          items: results.hits.hits.slice(0, defaultPaging.limit).map(feed => {
            return feed._source
          })
        }
      }
    })
  }
})
