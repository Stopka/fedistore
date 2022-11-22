import { objectType } from 'nexus'

export const NodeStats = objectType({
  name: 'NodeStats',
  definition: (t) => {
    t.nonNull.int('channel')
    t.nonNull.int('account')
  }
})
