import { Client } from '@elastic/elasticsearch'

export default async function createMissingNodes (
  elastic: Client,
  index: string,
  domains: string[],
  discoveredByDomain: string | undefined,
  crawlingDepth: number,
  crawlingVersion: number
): Promise<number> {
  const response = await elastic.bulk({
    index,
    body: domains.flatMap((domain) => [
      {
        create: { _id: domain }
      },
      {
        domain,
        discoveredByDomain,
        crawlingDepth,
        crawlingVersion,
        foundAt: new Date().getTime()
      }
    ])
  })
  const createdCount = response.items.filter(
    (item) => item.create?.status === 201
  ).length
  console.warn('Created new nodes', {
    requestedCount: domains.length,
    createdCount,
    errors: response.items
      .filter((item) => item.create?.status !== 201)
      .map((item) => item.create?.error?.reason)
  })
  return createdCount
}
