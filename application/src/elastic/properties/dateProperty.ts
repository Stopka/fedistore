import { MappingProperty } from '@elastic/elasticsearch/lib/api/types.js'

const dateProperty: MappingProperty = { type: 'date', format: 'epoch_millis' }

export default dateProperty
