import { Config } from 'convict'
import AccessConfig from './AccessConfig.js'
import CorsConfig from './CorsConfig.js'
import CrawlingConfig from './CrawlingConfig.js'
import DefaultPagingConfig from './DefaultPagingConfig.js'
import ElasticConfig from './ElasticConfig.js'
import HttpConfig from './HttpConfig.js'

type AppConfig = Config<{
  cors: CorsConfig
  http: HttpConfig
  elastic: ElasticConfig
  access: AccessConfig
  defaultPaging: DefaultPagingConfig
  crawling: CrawlingConfig
}>

export default AppConfig
