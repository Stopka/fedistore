import { objectType } from 'nexus'
import { Stats } from './Stats.js'
import { StatsAggregation } from './StatsAggregation.js'

export const StatsAggregations = objectType({
  name: 'StatsAggregations',
  definition: (t) => {
    t.nonNull.field('sum', { type: StatsAggregation })
    t.nonNull.field('max', { type: StatsAggregation })
  }
})
