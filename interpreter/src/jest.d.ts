export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTokenAtPosition(token: { expectedType: string, expectedLiteral: string }, pos: number): R;
    }
  }
}