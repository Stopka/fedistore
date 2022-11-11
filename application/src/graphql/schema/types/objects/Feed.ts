import { objectType } from 'nexus'
import { Context } from '../../../context/index.js'
import { Field } from './Field.js'
import FeedSource from '../../../../elastic/types/Feed.js'
import NodeSource from '../../../../elastic/types/Node.js'
import { DateTime } from '../scalars/index.js'
import feedIndex from '../../../../elastic/indicies/feedIndex.js'
import nodeIndex from '../../../../elastic/indicies/nodeIndex.js'
import { Node } from './Node.js'
import { FeedTypeEnum } from '../enums/index.js'
import getFeedId from '../../../../elastic/helpers/getFeedId.js'

export const Feed = objectType({
  name: 'Feed',
  definition: (t) => {
    t.nonNull.id('id', {
      resolve: async (source: FeedSource) => {
        return getFeedId(source.name, source.domain)
      }
    })
    t.nonNull.string('domain')
    t.nonNull.field('foundAt', { type: DateTime })
    t.nullable.field('refreshedAt', { type: DateTime })
    t.nonNull.string('name')
    t.nonNull.string('displayName')
    t.nonNull.string('description')
    t.nullable.int('followersCount')
    t.nullable.int('followingCount')
    t.nullable.int('statusesCount')
    t.nullable.int('statusesCount')
    t.nullable.field('lastStatusAt', { type: DateTime })
    t.nullable.field('createdAt', { type: DateTime })
    t.nullable.boolean('bot')
    t.nonNull.boolean('locked')
    t.nonNull.string('url')
    t.nullable.string('avatar')
    t.nonNull.field('type', {
      type: FeedTypeEnum
    })
    t.nullable.field('parent', {
      type: Feed,
      resolve: async (source: FeedSource, args, { elasticClient }: Context) => {
        if (source.parentFeedName === undefined || source.parentFeedDomain === undefined) {
          return null
        }
        const parentId = getFeedId(source.parentFeedName, source.parentFeedDomain)
        try {
          const parentFeedResult = await elasticClient.get<FeedSource>({
            index: feedIndex,
            id: parentId
          })
          return parentFeedResult._source
        } catch (error) {
          console.warn('Parent feed not found', {
            feedId: getFeedId(source.name, source.domain),
            parentId,
            error
          })
          return null
        }
      }
    })
    t.nonNull.list.nonNull.field('fields', {
      type: Field
    })
    t.nonNull.field('node', {
      type: Node,
      resolve: async (source: FeedSource, args, { elasticClient }: Context) => {
        const nodeResult = await elasticClient.get<NodeSource>({
          index: nodeIndex,
          id: source.domain
        })
        return nodeResult._source
      }
    })
  }
})
