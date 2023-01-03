import { makeSchema } from 'nexus'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import context from '../context/Context.js'
import * as types from './types/index.js'
import * as queries from './queries/index.js'
// import * as mutations from './mutations/index.js'
// eslint-disable-next-line no-unused-vars
const dirName = fileURLToPath(dirname(import.meta.url))
const schema = makeSchema({
  types: {
    ...types,
    ...queries
    // ...mutations
  },
  sourceTypes: {
    modules: [{
      module: join(dirName, 'sources', 'elastic.ts'),
      alias: 'elastic'
    }]
  },
  // outputs: {
  //   typegen: join(dirName, 'generated', 'nexus.ts'),
  //   schema: join(dirName, 'generated', 'schema.graphql')
  // },
  contextType: {
    module: join(dirName, '..', 'context', 'Context.ts'),
    export: 'Context'
  }
})

export default schema
