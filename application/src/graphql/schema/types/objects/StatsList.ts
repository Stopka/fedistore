import { objectType } from 'nexus'
import { ListStatsType } from '../../queries/index.js'
import { Stats } from './Stats.js'
import { StatsAggregations } from './StatsAggregations.js'

export interface StatsAggregationType {
  nodeCount: number
  accountFeedCount: number
  channelFeedCount: number
}

export interface StatsAggregationsType {
  sum: StatsAggregationType
  max: StatsAggregationType
}

export const StatsList = objectType({
  name: 'StatsList',
  definition: (t) => {
    t.nonNull.list.nonNull.field('items', { type: Stats })
    t.nonNull.field('aggregations', {
      type: StatsAggregations,
      resolve: (source: ListStatsType): StatsAggregationsType => {
        const result: StatsAggregationsType = {
          sum: {
            nodeCount: 0,
            accountFeedCount: 0,
            channelFeedCount: 0
          },
          max: {
            nodeCount: 0,
            accountFeedCount: 0,
            channelFeedCount: 0
          }
        }
        source.items.forEach(item => {
          if (item.softwareName === null || item.softwareName === undefined) {
            return
          }
          result.sum.nodeCount += item.nodeCount
          result.sum.accountFeedCount += item.accountFeedCount
          result.sum.channelFeedCount += item.channelFeedCount
          result.max.nodeCount = Math.max(item.nodeCount, result.max.nodeCount)
          result.max.accountFeedCount = Math.max(item.accountFeedCount, result.max.accountFeedCount)
          result.max.channelFeedCount = Math.max(item.channelFeedCount, result.max.channelFeedCount)
        })
        return result
      }
    })
  }
})
