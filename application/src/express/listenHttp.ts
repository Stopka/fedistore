import { IncomingMessage, Server, ServerResponse } from 'http'

export default async function listenHttp <
    Request extends typeof IncomingMessage = typeof IncomingMessage,
    Response extends typeof ServerResponse = typeof ServerResponse,
    > (httpServer: Server<Request, Response>, port: number): Promise<void> {
  return await new Promise((resolve) => httpServer.listen(
    {
      port
    },
    resolve
  ))
}
