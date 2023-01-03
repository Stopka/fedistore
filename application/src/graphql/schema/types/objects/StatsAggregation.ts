import { objectType } from 'nexus'

export const StatsAggregation = objectType({
  name: 'StatsAggregation',
  definition: (t) => {
    t.nonNull.int('nodeCount')
    t.nonNull.int('accountFeedCount')
    t.nonNull.int('channelFeedCount')
  }
})
