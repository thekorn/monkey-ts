export type TokenType = string

export default class Token {
  readonly type: TokenType
  readonly literal: string

  constructor(type: TokenType, literal: string ) {
    this.type = type
    this.literal = literal
  }
}

export const ILLEGAL: TokenType = 'ILLEGAL'
export const EOF: TokenType = 'EOF'

// identifiers and literla
export const IDENT: TokenType = 'IDENT' // add, foobar, x, y
export const INT: TokenType = 'INT' // 123456

// Operators
export const ASSIGN: TokenType = "="
export const PLUS: TokenType = '+'

// delimiters
export const COMMA: TokenType = ','
export const SEMICOLON: TokenType = ';'

export const LPAREN: TokenType = '('
export const RPAREN: TokenType = ')'
export const LBRACE: TokenType = '{'
export const RBRACE: TokenType = '}'

// keywords
export const FUNCTION: TokenType = 'FUNCTION'
export const LET: TokenType = 'LET'

const keywords = new Map<string, TokenType>([
  ['fn', FUNCTION],
  ['let', LET]
])

export function lookupIdent(ident: string): TokenType {
  const x = keywords.get(ident)
  if (x) return x
  return IDENT
}