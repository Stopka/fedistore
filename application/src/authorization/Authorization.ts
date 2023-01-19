export default interface Authorization {
  assertCanWrite: () => Promise<void>
}
