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

// identifiers and literal
export const IDENT: TokenType = 'IDENT' // add, foobar, x, y
export const INT: TokenType = 'INT' // 123456

// Operators
export const ASSIGN: TokenType = "="
export const PLUS: TokenType = '+'
export const MINUS: TokenType = '-'
export const BANG: TokenType = '!'
export const ASTERISK: TokenType = '*'
export const SLASH: TokenType = '/'

export const LT: TokenType = '<'
export const GT: TokenType = '>'

export const EQ: TokenType = '=='
export const NOT_EQ: TokenType = '!='

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

export const TRUE: TokenType = 'TRUE'
export const FALSE: TokenType = 'FALSE'
export const IF: TokenType = 'IF'
export const ELSE: TokenType = 'ELSE'
export const RETURN: TokenType = 'RETURN'

const keywords = new Map<string, TokenType>([
  ['fn', FUNCTION],
  ['let', LET],
  ['true', TRUE],
  ['false', FALSE],
  ['if', IF],
  ['else', ELSE],
  ['return', RETURN]
])

export function lookupIdent(ident: string): TokenType {
  const x = keywords.get(ident)
  if (x) return x
  return IDENT
}