import { NodeSortingByEnum } from '../enums/index.js'
import createSortingInput from '../../../schemaFactories/createSortingInput.js'

export const NodeQueryInput = createSortingInput(
  'NodeQueryInput',
  NodeSortingByEnum,
  (t) => {
    t.nonNull.string('search', { default: '' })
  },
  'refreshedAt',
  'desc'
)
