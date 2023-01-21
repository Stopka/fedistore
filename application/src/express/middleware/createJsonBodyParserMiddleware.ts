import bodyParser from 'body-parser'
import { RequestHandler } from 'express'

export default async function createJsonBodyParserMiddleware (): Promise< RequestHandler > {
  console.info('Creating json body parser midlleware')
  return bodyParser.json()
}
