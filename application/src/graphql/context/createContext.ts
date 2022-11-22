import Context from './Context.js'
import createElasticClient from '../../elastic/createElasticClient.js'
import AppConfig from '../../config/AppConfig.js'

export default async function createContext (config: AppConfig): Promise<Context> {
  console.info('Creating graphql context')
  return {
    elasticClient: await createElasticClient(config.get('elastic')),
    defaultPaging: config.get('defaultPaging'),
    indicies: {
      node: 'node',
      feed: 'feed'
    }
  }
}
