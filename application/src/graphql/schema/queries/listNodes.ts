import { arg, extendType, nonNull } from 'nexus'
import { NodeQueryInput, PagingInput, NodeList } from '../types/index.js'
import { Context } from '../../context/index.js'
import Node from '../../../elastic/types/Node.js'
import prepareSimpleQuery from '../../../elastic/prepareSimpleQuery.js'
import { PagingInputType } from '../../types/PagingInputType.js'
import SortingInputType from '../../types/SortingInput.js'
import { NodeSortingByValues } from '../../values/NodeSortingByValues.js'

type ListNodesSortByTuple = typeof NodeSortingByValues
type ListNodesSortBy = ListNodesSortByTuple[number]

interface ListNodesArgs {
  paging: PagingInputType
  query: SortingInputType<ListNodesSortBy> & { search: string }
}

export const listNodes = extendType({
  type: 'Query',
  definition (t) {
    t.field('listNodes', {
      type: NodeList,
      args: {
        paging: arg({
          type: nonNull(PagingInput),
          default: { page: 0 }
        }),
        query: arg({
          type: nonNull(NodeQueryInput),
          default: { default: '', sortBy: 'refreshedAt', sortWay: 'desc' }
        })
      },
      resolve: async (event, { paging, query }: ListNodesArgs, { elasticClient, defaultPaging, indicies }: Context) => {
        console.info('Searching nodes', { paging, query })

        const results = await elasticClient.search<Node>({
          index: indicies.node,
          query: {
            bool: {
              must: [
                {
                  exists: {
                    field: query.sortBy
                  }
                },
                {
                  exists: {
                    field: 'softwareName'
                  }
                }
              ],
              should: query.search !== ''
                ? [
                    {
                      wildcard: {
                        softwareName: {
                          value: `*${query.search}*`,
                          boost: 1
                        }
                      }
                    },
                    {
                      wildcard: {
                        softwareVersion: {
                          value: `*${query.search}*`,
                          boost: 1
                        }
                      }
                    },
                    {
                      wildcard: {
                        domain: {
                          value: `*${query.search}*`,
                          boost: 2
                        }
                      }
                    },
                    {
                      simple_query_string: {
                        query: prepareSimpleQuery(query.search),
                        fields: [
                          'softwareName^1',
                          'version^1',
                          'domain^2'
                        ],
                        default_operator: 'AND'
                      }
                    }
                  ]
                : [{ match_all: {} }],
              minimum_should_match: 1
            }
          },
          size: defaultPaging.limit + 1,
          from: paging.page * defaultPaging.limit,
          sort: `${query.sortBy}:${query.sortWay}`
        })

        return {
          paging: {
            hasNext: typeof results.hits.hits[defaultPaging.limit] !== 'undefined'
          },
          items: results.hits.hits.slice(0, defaultPaging.limit).map(node => {
            return node._source
          })
        }
      }
    })
  }
})
