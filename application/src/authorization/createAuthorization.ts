import { AuthenticationError } from 'apollo-server-express'
import { Request } from 'express'
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
      throw new AuthenticationError('You have not permission to call this query')
    }
  }
}
