import { Client } from '@elastic/elasticsearch'
import ElasticConfig from '../config/ElasticConfig.js'

export default async function createElasticClient (config: ElasticConfig): Promise<Client> {
  console.info('Creating elastic client', { url: config.url, user: config.user })
  return new Client({
    node: {
      url: new URL(config.url)
    },
    auth: {
      username: config.user,
      password: config.password
    }
  })
}
