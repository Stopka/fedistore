import createSortingByEnum from '../../../schemaFactories/createSortingByEnum.js'

export const NodeSortingByEnum = createSortingByEnum('NodeSortingByEnum', [
  'domain',
  'softwareName',
  'totalUserCount',
  'monthActiveUserCount',
  'halfYearActiveUserCount',
  'statusesCount',
  'accountFeedCount',
  'openRegistrations',
  'refreshedAt'
])
