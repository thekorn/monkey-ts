import { Identifier, LetStatement, Program, Statement } from "./ast";
import { Lexer } from "./lexer";
import Token, { ASSIGN, EOF, IDENT, LET, SEMICOLON, TokenType } from './token'


export class Parser {
  #l: Lexer
  //@ts-ignore
  #curToken?: Token
  #peekToken?: Token
  #errors: string[]

  constructor(l: Lexer) {
    this.#l = l
    this.#errors = []
    // read tow tokens, to get curToken and peekToken both set
    this.#nextToken()
    this.#nextToken()
  }

  #nextToken() {
    this.#curToken = this.#peekToken
    this.#peekToken = this.#l.nextToken()
  }

  #parseStatement(): Statement | null {
    switch (this.#curToken?.type) {
      case LET:
        return this.#parseLetStatement()
      default:
        return null
    }
  }

  #curTokenIs(t: TokenType): boolean {
    return this.#curToken?.type === t
  }

  #peekTokenIs(t: TokenType): boolean {
    return this.#peekToken?.type === t
  }

  #expectPeek(t: TokenType): boolean {
    if (this.#peekTokenIs(t)) {
      this.#nextToken()
      return true
    } else {
      this.#peekError(t)
      return false
    }
  }

  //@ts-ignore
  #peekError(t: TokenType) {
    this.#errors.push(`expected next token to be ${t}, got ${this.#peekToken?.type}`)
  }

  #parseLetStatement(): LetStatement | null {
    const t = this.#curToken

    if (!this.#expectPeek(IDENT)) return null

    const name = new Identifier(this.#curToken!, this.#curToken!.literal)

    if (!this.#expectPeek(ASSIGN)) return null

    // TODO: we are skipping this expression until we
    // find a semicolon
    while (!this.#curTokenIs(SEMICOLON)) {
      this.#nextToken()
    }

    return new LetStatement(t!, name)
  }

  parseProgram(): Program {
    const statements: Statement[] = []

    while ( this.#curToken?.type !== EOF) {
      const stmt = this.#parseStatement()
      if (stmt) statements.push(stmt)
      this.#nextToken()
    }
    return new Program(statements)
  }

  get errors(): string[] {
    return this.#errors
  }
}