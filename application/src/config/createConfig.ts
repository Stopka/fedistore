import convict from 'convict'
import AppConfig from './AppConfig.js'
import formats from 'convict-format-with-validator'

export default function createConfig (): AppConfig {
  console.info('Creating config')
  convict.addFormats(formats)
  convict.addFormat({
    name: 'string-array',
    validate: function (sources: unknown, schema) {
      if (!Array.isArray(sources)) {
        throw new Error('must be of type Array')
      }

      for (const source of sources) {
        convict(schema.children).load(source).validate()
      }
    },
    coerce (val: unknown): string[] {
      if (Array.isArray(val)) {
        return val.map(item => item.toString())
      }
      if (typeof val !== 'string') {
        return []
      }
      return val.split(/[,;|\s]/)
    }
  })

  return convict({
    http: {
      port: {
        doc: 'The port to bind',
        format: 'port',
        default: 3000,
        env: 'HTTP_PORT',
        arg: 'http-port'
      },
      path: {
        doc: 'The path to expose graphql on',
        default: '/api/graphql',
        env: 'HTTP_PATH',
        arg: 'http-path'
      }
    },
    cors: {
      allowedOrigins: {
        doc: 'Domains allowed to call api using http cors headers',
        env: 'CORS_ALLOWED_ORIGINS',
        arg: 'cors-allowed-origins',
        format: 'string-array',
        default: ['*'],
        children: 'string'
      }
    },
    elastic: {
      url: {
        doc: 'Elastic server url',
        format: 'url',
        default: 'elastic',
        env: 'ELASTIC_URL',
        arg: 'elastic-url'
      },
      user: {
        doc: 'Elastic server url',
        format: 'url',
        default: 'elastic',
        env: 'ELASTIC_USER',
        arg: 'elastic-user'
      },
      password: {
        doc: 'Elastic server url',
        format: 'url',
        default: 'elastic',
        env: 'ELASTIC_PASSWORD',
        arg: 'elastic-password'
      }
    },
    access: {
      write: {
        doc: 'Api keys that have permission to read and write from database',
        env: 'ACCESS_WRITE',
        arg: 'access-write',
        format: 'string-array',
        default: [''],
        children: 'string'
      }
    },
    defaultPaging: {
      limit: {
        doc: 'Default number of items on a page',
        env: 'DEFAULT_PAGING_LIMIT',
        arg: 'default-paging-limit',
        format: 'int',
        default: 20
      }
    },
    crawling: {
      version: {
        doc: 'Index schema version. Increasing the number makes all nodes reindexed',
        env: 'CRAWLING_VERSION',
        arg: 'crawling-version',
        format: 'int',
        default: 0
      }
    }
  })
}
