import { arg, extendType, nonNull, stringArg } from 'nexus'
import Feed from '../../../elastic/types/Feed.js'
import { Context } from '../../context/index.js'
import { FeedInput } from '../types/index.js'

export const createFeed = extendType({
  type: 'Mutation',
  definition (t) {
    t.field('createFeed', {
      type: 'Feed',
      args: {
        nodeDomain: nonNull(stringArg()),
        feedInput: nonNull(arg({ type: FeedInput }))
      },
      resolve: async (event, { nodeDomain, feedInput }, { elasticClient, indicies }: Context) => {
        const fullName = `${feedInput.name}@${nodeDomain}`
        await elasticClient.create<Feed>({
          index: indicies.feed,
          id: fullName,
          document: {
            fullName,
            domain: nodeDomain,
            url: feedInput.url,
            name: feedInput.name,
            bot: feedInput.bot,
            avatar: feedInput.avatar,
            followersCount: feedInput.followersCount,
            followingCount: feedInput.followingCount,
            statusesCount: feedInput.statusesCount,
            lastStatusAt: feedInput.lastStatusAt?.getTime(),
            description: feedInput.description,
            displayName: feedInput.displayName,
            locked: feedInput.locked,
            createdAt: feedInput.createdAt.getTime(),
            foundAt: new Date().getTime(),
            fields: feedInput.fields.map((field) => {
              return { name: field.name, value: field.value }
            }),
            extractedEmails: feedInput.extractedEmails,
            extractedTags: feedInput.extractedTags,
            parentFeedName: feedInput.parentFeed?.name,
            parentFeedDomain: feedInput.parentFeed?.hostDomain,
            type: feedInput.type
          }
        })
        console.info('Created new feed', {
          feedName: feedInput.name,
          nodeDomain
        })
        return assertDefined(
          await getFeed(elastic, fullName),
          'Missing feed after creating it'
        )
      }
    })
  }
})
