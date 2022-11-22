import { inputObjectType } from 'nexus'

export const FeedIdentityInput = inputObjectType({
  name: 'FeedIdentityInput',
  definition: (t) => {
    t.nonNull.string('name')
    t.nonNull.string('nodeDomain')
  }
})
