import readline from 'node:readline'
import { Lexer } from './lexer'
import * as Tokens from './token'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>>> '
})

rl.prompt()

rl.on('line', (line: string) => {
  const lexer = new Lexer(line.trim())
  let tok = lexer.nextToken()
  while (tok.type !== Tokens.EOF) {
    console.log(tok);
    tok = lexer.nextToken()
  }
  rl.prompt()
}).on('close', () => {
  console.log('DONE!');
  process.exit(0)
})

