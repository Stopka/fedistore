import { NexusInputObjectTypeDef } from 'nexus/dist/definitions/inputObjectType.js'
import { inputObjectType } from 'nexus'

export default function createSortingQueryInput (
  name: string,
  sortingInput,
  definition: (t) => void
): NexusInputObjectTypeDef<string> {
  return inputObjectType({
    name,
    definition: (t) => {
      t.nonNull.field('sorting', {
        type: sortingInput
      })
      definition(t)
    }
  })
}
