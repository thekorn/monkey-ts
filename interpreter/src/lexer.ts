import Token from './token'
import * as Tokens from './token'

function isLetter(ch?: string | null): boolean {
  if (!ch) return false
  return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch == '_'
}

function isDigit(ch?: string | null): boolean {
  if (!ch) return false
  return '0' <= ch && ch <= '9'
}

export class Lexer {
  #input: string

  //@ts-ignore
  #position: number = 0
  #readPosition: number = 0
  #ch: string | null

  constructor(input: string) {
    this.#input = input
    this.#ch = null
    this.#readChar()
  }

  #readChar() {
    if (this.#readPosition >= this.#input.length) {
      this.#ch = null
    } else {
      this.#ch = this.#input.charAt(this.#readPosition)
    }
    this.#position = this.#readPosition
    this.#readPosition += 1
  }

  #readIdentifier(): string {
    const position: number = this.#position
    while (isLetter(this.#ch)) {
      this.#readChar()
    }
    return this.#input.slice(position, this.#position)
  }

  #readNumber(): string {
    const position: number = this.#position
    while (isDigit(this.#ch)) {
      this.#readChar()
    }
    return this.#input.slice(position, this.#position)
  }

  #skipWhitespace() {
    while (this.#ch && ' \t\n\r'.includes(this.#ch)) {
      this.#readChar()
    }
  }

  nextToken(): Token {
    let tok: Token | null = null
    this.#skipWhitespace()
    switch (this.#ch) {
      case '=':
        tok = new Token(Tokens.ASSIGN, this.#ch)
        break
      case ';':
        tok = new Token(Tokens.SEMICOLON, this.#ch)
        break
      case '(':
        tok = new Token(Tokens.LPAREN, this.#ch)
        break
      case ')':
        tok = new Token(Tokens.RPAREN, this.#ch)
        break
      case ',':
        tok = new Token(Tokens.COMMA, this.#ch)
        break
      case '+':
        tok = new Token(Tokens.PLUS, this.#ch)
        break
      case '{':
        tok = new Token(Tokens.LBRACE, this.#ch)
        break
      case '}':
        tok = new Token(Tokens.RBRACE, this.#ch)
        break
      case null:
        tok = new Token(Tokens.EOF, '')
        break
      default:
        if (isLetter(this.#ch)) {
          const literal = this.#readIdentifier()
          return new Token(Tokens.lookupIdent(literal), literal)
        } else if (isDigit(this.#ch)) {
          return new Token(Tokens.INT, this.#readNumber())
        } else {
          tok = new Token(Tokens.ILLEGAL, this.#ch)
        }
    }

    this.#readChar()
    return tok!
  }

}