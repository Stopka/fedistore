import { Client } from '@elastic/elasticsearch'
import Authorization from '../../authorization/Authorization.js'
import DefaultPagingConfig from '../../config/DefaultPagingConfig.js'
import Indicies from './Indicies.js'

export interface Context {
  elasticClient: Client
  defaultPaging: DefaultPagingConfig
  indicies: Indicies

  authorization: Authorization
}

export default Context
