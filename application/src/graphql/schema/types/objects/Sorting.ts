import { objectType } from 'nexus'
import { SortingWayEnum } from '../enums/index.js'

export const Sorting = objectType({
  name: 'Sorting',
  definition: (t) => {
    t.nonNull.string('by')
    t.nonNull.field('way', {
      type: SortingWayEnum
    })
  }
})
