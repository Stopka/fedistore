import { NexusEnumTypeDef } from 'nexus/dist/definitions/enumType.js'
import { enumType } from 'nexus'

export default function createSortingByEnum (
  name: string,
  members: readonly [string, ...string[]]
): NexusEnumTypeDef<string> {
  return enumType({
    name,
    members
  })
}
