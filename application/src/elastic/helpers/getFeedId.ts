export default function getFeedId (name: string, domain: string): string {
  return `${name}@${domain}`
}
