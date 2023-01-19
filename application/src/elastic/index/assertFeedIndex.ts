import { Client } from '@elastic/elasticsearch'
import { IngestProcessorContainer } from '@elastic/elasticsearch/lib/api/types.js'
import dateProperty from '../properties/dateProperty.js'

const assertFeedIndex = async (elastic: Client, index: string): Promise<void> => {
  console.info('Setting feed pipeline', { index })
  const processors: IngestProcessorContainer[] = []
  await elastic.ingest.putPipeline({
    id: 'feed',
    description: 'Default feed pipeline',
    processors
  })
  console.info('Checking feed index', { index })
  const exists = await elastic.indices.exists({
    index
  })
  if (exists) {
    console.info('Feed index exists', { index })
  } else {
    console.info('Creating feed index', { index })
    await elastic.indices.create({
      index,
      settings: {
        default_pipeline: 'feed',
        analysis: {
          analyzer: {
            standard: {
              type: 'standard'
            },
            html: {
              type: 'custom',
              tokenizer: 'standard',
              filter: ['lowercase'],
              char_filter: ['html_strip']
            }
          }
        }
      }
    })
  }

  console.info('Setting feed mapping', { index })
  await elastic.indices.putMapping({
    index,
    properties: {
      domain: { type: 'text', analyzer: 'standard' },
      foundAt: dateProperty,
      refreshedAt: dateProperty,
      name: { type: 'text', analyzer: 'standard' },
      fullName: { type: 'text', analyzer: 'standard' },
      displayName: { type: 'text', analyzer: 'html' },
      description: { type: 'text', analyzer: 'html' },
      followersCount: { type: 'integer' },
      followingCount: { type: 'integer' },
      statusesCount: { type: 'integer' },
      lastStatusAt: dateProperty,
      createdAt: dateProperty,
      bot: { type: 'boolean' },
      locked: { type: 'boolean' },
      url: { type: 'text' },
      avatar: { type: 'text' },
      type: { type: 'keyword' },
      parentFeedName: { type: 'text', analyzer: 'standard' },
      parentFeedDomain: { type: 'text', analyzer: 'standard' },
      fields: {
        type: 'nested',
        properties: {
          name: { type: 'text', analyzer: 'html' },
          value: { type: 'text', analyzer: 'html' }
        }
      },
      extractedEmails: { type: 'text', analyzer: 'standard' },
      extractedTags: { type: 'text', analyzer: 'standard' }
    }
  })
  await elastic.indices.refresh({ index })
}

export default assertFeedIndex
