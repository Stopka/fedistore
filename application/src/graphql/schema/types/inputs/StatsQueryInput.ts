import { StatsSortingByEnum } from '../enums/index.js'
import createSortingInput from '../../../schemaFactories/createSortingInput.js'

export const StatsQueryInput = createSortingInput(
  'StatsQueryInput',
  StatsSortingByEnum,
  () => {},
  'nodeCount',
  'desc'
)
