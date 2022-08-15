import { LetStatement } from "./ast"
import { Lexer } from "./lexer"
import { Parser } from "./parser"

interface TestIdentifier {
  expectedIdentifier: string
}

expect.extend({
  toBeLetStatementWithIdentifier(stmt: LetStatement | undefined, identifier: TestIdentifier) {
    if (!stmt) return {
      pass: false,
      message: () => 'statement not found in program'
    }

    if (stmt.tokenLiteral() !== 'let') return {
      pass: false,
      message: () => 'statement does not have the let keyword'
    }

    if (stmt.name.value !== identifier.expectedIdentifier) return {
      pass: false,
      message: () => `statement does not have the correct name, got='${stmt.name.value}', expected='${identifier.expectedIdentifier}'`
    }

    if (stmt.name.tokenLiteral() !== identifier.expectedIdentifier) return {
      pass: false,
      message: () => 'statement does not have the correct name token literal'
    }
    
    return {
      pass: true,
      message: () => 'statement is a proper let statement'
    }

  }
})

test('test let statement', () => {
  const input = `
    let x = 5;
    let y = 10;
    let foobar = 838383;
  `

  const lexer = new Lexer(input)
  const parser = new Parser(lexer)

  const program = parser.parseProgram()
  expect(program).not.toBe(null)
  expect(program!.statements.length).toBe(3)

  const expectedResult: TestIdentifier[] = [
    { expectedIdentifier: 'x'},
    { expectedIdentifier: 'y'},
    { expectedIdentifier: 'foobar'},
  ]

  for (let i = 0; i < expectedResult.length; i++) {
    const stmt = program?.statements[i]
    expect(stmt).toBeLetStatementWithIdentifier(expectedResult[i])
  }
})