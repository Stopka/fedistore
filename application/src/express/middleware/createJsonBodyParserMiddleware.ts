import bodyParser from 'body-parser'
import { RequestHandler } from 'express'

export default function createJsonBodyParserMiddleware (): RequestHandler {
  console.info('Creating json body parser midlleware')
  return bodyParser.json()
}
