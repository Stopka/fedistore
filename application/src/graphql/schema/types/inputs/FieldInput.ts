import { inputObjectType } from 'nexus'

export const FieldInput = inputObjectType({
  name: 'FieldInput',
  definition: (t) => {
    t.nonNull.string('name')
    t.nonNull.string('value')
  }
})
