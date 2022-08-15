export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeTokenAtPosition(token: { expectedType: string, expectedLiteral: string }, pos: number, lexer?: {getCurrentState?: () => string}): R;
      toBeLetStatementWithIdentifier(expectedIdentifier: {expectedIdentifier: string}): R;
    }
  }
}