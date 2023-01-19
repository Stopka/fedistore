import { Client } from '@elastic/elasticsearch'
import dateProperty from '../properties/dateProperty.js'

const assertNodeIndex = async (elastic: Client, index: string): Promise<void> => {
  console.info('Setting node pipeline', { index })
  await elastic.ingest.putPipeline({
    id: 'node',
    description: 'Default node pipeline',
    processors: [
      {
        grok: {
          ignore_missing: true,
          field: 'softwareVersion',
          patterns: ['%{VERSION:standardizedSoftwareVersion}'],
          pattern_definitions: {
            VERSION: '(?:[0-9]+\\.?[0-9]+\\.?[0-9]+)'
          }
        }
      }
    ]
  })

  console.info('Checking node index', { index })
  const exists = await elastic.indices.exists({
    index
  })
  if (exists) {
    console.info('Node index exists', { index })
  } else {
    console.info('Creating node index', { index })
    await elastic.indices.create({
      index,
      settings: {
        default_pipeline: 'node'
      }
    })
  }

  console.info('Setting node mapping', { index })
  await elastic.indices.putMapping({
    index,
    properties: {
      name: { type: 'text' },
      domain: { type: 'text' },
      softwareName: { type: 'keyword' },
      softwareVersion: { type: 'text' },
      standardizedSoftwareVersion: { type: 'keyword' },
      totalUserCount: { type: 'integer' },
      monthActiveUserCount: { type: 'integer' },
      halfYearActiveUserCount: { type: 'integer' },
      statusesCount: { type: 'integer' },
      foundAt: dateProperty,
      refreshedAt: dateProperty,
      refreshAttemptedAt: dateProperty,
      openRegistrations: { type: 'boolean' },
      serverIps: { type: 'ip' },
      discoveredByDomain: { type: 'text' },
      geoip: {
        type: 'nested',
        properties: {
          location: { type: 'geo_point' },
          continent_name: { type: 'keyword' },
          country_name: { type: 'keyword' },
          country_iso_code: { type: 'keyword' },
          region_name: { type: 'keyword' },
          region_iso_code: { type: 'keyword' },
          city_name: { type: 'keyword' }
        }
      },
      accountFeedCount: { type: 'integer' },
      channelFeedCount: { type: 'integer' },
      crawlingDepth: { type: 'integer' },
      crawlingVersion: { type: 'integer' }
    }
  })

  await elastic.indices.refresh({ index })
}

export default assertNodeIndex
