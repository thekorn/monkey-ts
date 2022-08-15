import * as TOKEN from './token'
import Token from './token'
import { Lexer } from './lexer'

interface TestToken {
  expectedType: TOKEN.TokenType
  expectedLiteral: string
}

expect.extend({
  toBeTokenAtPosition(token: Token, expectedToken: TestToken, pos: number) {
    const pass = token.literal === expectedToken.expectedLiteral && token.type === expectedToken.expectedType

    if (pass) {
      return {
        pass: true,
        message: () => `expected token to be an expected token`  //TODO better message
      }
    } else {
      return {
        pass: false,
        message: () => `expected token at position ${pos} to be ${JSON.stringify(expectedToken)}, got ${JSON.stringify(token)}`
      }
    }

  }
})

test("Test next token", () => {
  const input = ';=+(){},'
  const expectedResult: TestToken[] = [
    { expectedType: TOKEN.SEMICOLON, expectedLiteral: ';' },
    { expectedType: TOKEN.ASSIGN, expectedLiteral: '=' },
    { expectedType: TOKEN.PLUS, expectedLiteral: '+' },
    { expectedType: TOKEN.LPAREN, expectedLiteral: '(' },
    { expectedType: TOKEN.RPAREN, expectedLiteral: ')' },
    { expectedType: TOKEN.LBRACE, expectedLiteral: '{' },
    { expectedType: TOKEN.RBRACE, expectedLiteral: '}' },
    { expectedType: TOKEN.COMMA, expectedLiteral: ',' },
    { expectedType: TOKEN.EOF, expectedLiteral: '' }
  ]

  const lexer = new Lexer(input)

  for (let i = 0; i < expectedResult.length; i++) {
    const token = lexer.nextToken()
    const expectedToken = expectedResult[i];
    expect(token).toBeTokenAtPosition(expectedToken, i)
  }
});

test('test complex source code', () => {
  const input = `
    let five = 5;
    let ten = 10;

    let add = fn(x, y) {
      x + y;
    };

    let result = add(five, ten);
  `

  const expectedResult: TestToken[] = [
    { expectedType: TOKEN.LET, expectedLiteral: 'let' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'five' },
    { expectedType: TOKEN.ASSIGN, expectedLiteral: '=' },
    { expectedType: TOKEN.INT, expectedLiteral: '5' },
    { expectedType: TOKEN.SEMICOLON, expectedLiteral: ';' },
    { expectedType: TOKEN.LET, expectedLiteral: 'let' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'ten' },
    { expectedType: TOKEN.ASSIGN, expectedLiteral: '=' },
    { expectedType: TOKEN.INT, expectedLiteral: '10' },
    { expectedType: TOKEN.SEMICOLON, expectedLiteral: ';' },
    { expectedType: TOKEN.LET, expectedLiteral: 'let' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'add' },
    { expectedType: TOKEN.ASSIGN, expectedLiteral: '=' },
    { expectedType: TOKEN.FUNCTION, expectedLiteral: 'fn' },
    { expectedType: TOKEN.LPAREN, expectedLiteral: '(' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'x' },
    { expectedType: TOKEN.COMMA, expectedLiteral: ',' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'y' },
    { expectedType: TOKEN.RPAREN, expectedLiteral: ')' },
    { expectedType: TOKEN.LBRACE, expectedLiteral: '{' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'x' },
    { expectedType: TOKEN.PLUS, expectedLiteral: '+' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'y' },
    { expectedType: TOKEN.SEMICOLON, expectedLiteral: ';' },
    { expectedType: TOKEN.RBRACE, expectedLiteral: '}' },
    { expectedType: TOKEN.SEMICOLON, expectedLiteral: ';' },
    { expectedType: TOKEN.LET, expectedLiteral: 'let' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'result' },
    { expectedType: TOKEN.ASSIGN, expectedLiteral: '=' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'add' },
    { expectedType: TOKEN.LPAREN, expectedLiteral: '(' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'five' },
    { expectedType: TOKEN.COMMA, expectedLiteral: ',' },
    { expectedType: TOKEN.IDENT, expectedLiteral: 'ten' },
    { expectedType: TOKEN.RPAREN, expectedLiteral: ')' },
    { expectedType: TOKEN.SEMICOLON, expectedLiteral: ';' },
    { expectedType: TOKEN.EOF, expectedLiteral: '' }
  ]

  const lexer = new Lexer(input)

  for (let i = 0; i < expectedResult.length; i++) {
    const token = lexer.nextToken()
    const expectedToken = expectedResult[i];
    expect(token).toBeTokenAtPosition(expectedToken, i)
  }


})


test('test digit', () => {
  const input = `7;`

  const expectedResult: TestToken[] = [
    { expectedType: TOKEN.INT, expectedLiteral: '7' },
    { expectedType: TOKEN.SEMICOLON, expectedLiteral: ';' },
    { expectedType: TOKEN.EOF, expectedLiteral: '' }
  ]

  const lexer = new Lexer(input)

  for (let i = 0; i < expectedResult.length; i++) {
    const token = lexer.nextToken()
    const expectedToken = expectedResult[i];
    expect(token).toBeTokenAtPosition(expectedToken, i)
  }


})


test('test ident', () => {
  const input = `boo;`

  const expectedResult: TestToken[] = [
    { expectedType: TOKEN.IDENT, expectedLiteral: 'boo' },
    { expectedType: TOKEN.SEMICOLON, expectedLiteral: ';' },
    { expectedType: TOKEN.EOF, expectedLiteral: '' }
  ]

  const lexer = new Lexer(input)

  for (let i = 0; i < expectedResult.length; i++) {
    const token = lexer.nextToken()
    const expectedToken = expectedResult[i];
    expect(token).toBeTokenAtPosition(expectedToken, i)
  }


})