import { Client } from '@elastic/elasticsearch'

export default async function deleteDomainFeeds (
  elastic: Client,
  index: string,
  domains: string[]
): Promise<number> {
  await elastic.indices.refresh({ index })
  const result = await elastic.deleteByQuery({
    index,
    query: {
      bool: {
        should: domains.map((domain) => {
          return {
            regexp: {
              domain: {
                value: '(.*\\.)?' + domain,
                case_insensitive: true
              }
            }
          }
        }),
        minimum_should_match: 1
      }
    }
  })
  console.info('Deleted domain feeds', {
    count: result.deleted ?? 0,
    domains
  })
  return result.deleted ?? 0
}
