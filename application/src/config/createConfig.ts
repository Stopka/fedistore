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
    coerce (val: any): string[] {
      if (typeof val !== 'string') {
        return val
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
      read: {
        doc: 'Api keys that have permission to read from database',
        env: 'ACCESS_READ',
        arg: 'access-read',
        format: '*',
        default: ''
      },
      write: {
        doc: 'Api keys that have permission to read and write from database',
        env: 'ACCESS_WRITE',
        arg: 'access-write',
        format: '*',
        default: ''
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
    }
  })
}
