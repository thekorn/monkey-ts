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

function locations(str: string, char: string): number[] {
  const indices: number[] = []
  for(let i = 0; i < str.length; i++) {
    if (str[i] === char) indices.push(i)
  }
  return indices
}

function rangeIncludes(value: number, sortedNumberArray: number[]): [number, number, number] {
  let idx = 0
  while (sortedNumberArray[idx] < value) idx++
  return [idx, sortedNumberArray[idx - 1] + 1, sortedNumberArray[idx]]
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

  getCurrentState(): string {
    const allLineBreaks = locations(this.#input, '\n')
    let currentLine: string
    let relPos: number
    let prefix: string = ''
    if (allLineBreaks.length === 0) {
      prefix = 'line 0: '
      currentLine = this.#input
      relPos = this.#position + prefix.length
    } else {
      allLineBreaks.push(this.#input.length)
      const [lineCnt, start, end] = rangeIncludes(this.#position, allLineBreaks)
      prefix = `line ${lineCnt}: `
      relPos = this.#position - start + prefix.length
      currentLine = this.#input.slice(start, end)
    }
    return `${prefix}${currentLine}\n${' '.repeat(relPos - 1)}^`
  }

  nextToken(): Token {
    let tok: Token | null = null
    this.#skipWhitespace()
    switch (this.#ch) {
      case '=':
        tok = new Token(Tokens.ASSIGN, this.#ch)
        break
      case '+':
        tok = new Token(Tokens.PLUS, this.#ch)
        break
      case '-':
        tok = new Token(Tokens.MINUS, this.#ch)
        break
      case '!':
        tok = new Token(Tokens.BANG, this.#ch)
        break
      case '/':
        tok = new Token(Tokens.SLASH, this.#ch)
        break
      case '*':
        tok = new Token(Tokens.ASTERISK, this.#ch)
        break
      case '<':
        tok = new Token(Tokens.LT, this.#ch)
        break
      case '>':
        tok = new Token(Tokens.GT, this.#ch)
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