import { inputObjectType, list, nonNull } from 'nexus'
import { FeedTypeEnum } from '../enums/index.js'
import { DateTime } from '../scalars/index.js'
import { FeedIdentityInput } from './FeedIdentityInput.js'
import { FieldInput } from './FieldInput.js'

export const FeedInput = inputObjectType({
  name: 'FeedInput',
  definition: (t) => {
    t.nonNull.string('name')
    t.nonNull.string('displayName')
    t.nonNull.string('description')
    t.nonNull.int('followersCount')
    t.nonNull.int('followingCount')
    t.nullable.int('statusesCount')
    t.nullable.boolean('bot')
    t.nonNull.string('url')
    t.nullable.string('avatar')
    t.nonNull.boolean('locked')
    t.nullable.field('lastStatusAt', { type: DateTime })
    t.nonNull.field('createdAt', { type: DateTime })
    t.nonNull.field('fields', { type: list(nonNull(FieldInput)) })
    t.nonNull.field('type', { type: FeedTypeEnum })
    t.nullable.field('parentFeed', { type: FeedIdentityInput })
    t.nonNull.field('tags', { type: list(nonNull('String')) })
    t.nonNull.field('emails', { type: list(nonNull('String')) })
  }
})
