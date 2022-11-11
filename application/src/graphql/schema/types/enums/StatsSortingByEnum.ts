import createSortingByEnum from '../../../schemaFactories/createSortingByEnum.js'

export const StatsSortingByEnum = createSortingByEnum('StatsSortingByEnum', [
  'softwareName',
  'nodeCount',
  'accountFeedCount',
  'channelFeedCount'
])
