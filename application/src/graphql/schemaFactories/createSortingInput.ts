import { NexusEnumTypeDef } from 'nexus/dist/definitions/enumType.js'
import { InputDefinitionBlock } from 'nexus/dist/definitions/definitionBlocks.js'
import { inputObjectType } from 'nexus'
import { NexusInputObjectTypeDef } from 'nexus/dist/definitions/inputObjectType.js'
import { SortingWayEnum } from '../schema/types/index.js'

export default function createSortingInput (
  name: string,
  sortingByEnum: NexusEnumTypeDef<string>,
  definition: (t: InputDefinitionBlock<string>) => void,
  defaultBy: string,
  defaultWay: 'asc' | 'desc'
): NexusInputObjectTypeDef<string> {
  return inputObjectType({
    name,
    definition: (t) => {
      t.nullable.field('sortBy', {
        type: sortingByEnum,
        default: defaultBy
      })
      t.nullable.field('sortWay', {
        type: SortingWayEnum,
        default: defaultWay
      })
      definition(t)
    }
  })
}
