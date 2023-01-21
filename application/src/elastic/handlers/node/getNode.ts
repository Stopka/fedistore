import { Client } from '@elastic/elasticsearch'
import Node from '../../types/Node.js'

const getNode = async (
  elastic: Client,
  index: string,
  domain: string
): Promise<Node | undefined> => {
  const result = await elastic.get<Node>({
    index,
    id: domain
  })
  return result._source
}

export default getNode
