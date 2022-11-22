import { Client } from '@elastic/elasticsearch'
import DefaultPagingConfig from '../../config/DefaultPagingConfig.js'
import Indicies from './Indicies.js'

export interface Context {
  elasticClient: Client
  defaultPaging: DefaultPagingConfig
  indicies: Indicies
}

export default Context
