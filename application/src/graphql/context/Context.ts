import { Client } from '@elastic/elasticsearch'
import DefaultPagingConfig from '../../config/DefaultPagingConfig.js'

export interface Context {
  elasticClient: Client
  defaultPaging: DefaultPagingConfig
}

export default Context
