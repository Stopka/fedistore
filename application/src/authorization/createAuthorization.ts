import { Request } from 'express'
import { GraphQLError } from 'graphql/error/index.js'
import AccessConfig from '../config/AccessConfig.js'
import Authorization from './Authorization.js'

export default async function createAuthorization (accessConfig: AccessConfig, request: Request): Promise<Authorization> {
  const authorizationHeader = request.header('Authorization')
  console.info('Authenticating request', { authorizationHeader })
  const allowWrite = authorizationHeader !== undefined &&
            authorizationHeader !== '' &&
            accessConfig.write.includes(authorizationHeader)
  return {
    assertCanWrite: async (): Promise<void> => {
      if (allowWrite) return
      throw new GraphQLError('You have not permission to call this query', {
        extensions: { code: 'FORBIDDEN' }
      })
    }
  }
}
