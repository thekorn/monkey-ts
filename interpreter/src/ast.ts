import Token from "./token"

abstract class Node {
  abstract tokenLiteral(): string
}

export abstract class Statement extends Node {
  abstract statementNode(): void
}

abstract class Expression extends Node {
  abstract expressionNode(): void
}

export class Program extends Node {
  readonly statements: Statement[]

  constructor(statements: Statement[]) {
    super()
    this.statements = statements
  }

  tokenLiteral(): string {
    if (this.statements.length > 0) return this.statements[0].tokenLiteral()
    else return ''
  }
}

export class LetStatement extends Statement {
  readonly token: Token
  readonly name: Identifier
  readonly value?: Expression

  constructor(token: Token, name: Identifier, value?: Expression) {
    super()
    this.token = token
    this.name = name
    this.value = value
  }

  statementNode(): void {}

  tokenLiteral(): string {
      return this.token.literal
  }
}

export class Identifier extends Expression {
  readonly token: Token
  readonly value: string

  constructor(token: Token, value: string) {
    super()
    this.token = token
    this.value = value
  }

  expressionNode(): void {}

  tokenLiteral(): string {
    return this.token.literal
  }

}

export class ReturnStatement extends Statement {
  readonly token: Token
  readonly returnValue?: Expression

  constructor(token: Token, returnValue?: Expression) {
    super()
    this.token = token
    this.returnValue = returnValue
  }

  statementNode(): void {}

  tokenLiteral(): string {
      return this.token.literal
  }

}