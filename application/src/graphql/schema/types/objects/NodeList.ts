import { Paging } from './Paging.js'
import { Node } from './Node.js'
import { objectType } from 'nexus'

export const NodeList = objectType({
  name: 'NodeList',
  definition: (t) => {
    t.nonNull.field('paging', { type: Paging })
    t.nonNull.list.nonNull.field('items', { type: Node })
  }
})
