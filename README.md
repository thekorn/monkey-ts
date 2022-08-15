# writing a interpreter for the `monkey` programming language in typescript

[![Build and test](https://github.com/thekorn/monkey-ts/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/thekorn/monkey-ts/actions/workflows/build.yml)

This this closely following the book `Writing an interpreter in Go` by Thorsten Balls.
## 🚀 Project Structure

Inside the project, you'll see the following folders and files:

```
.
├── interpreter
│  ├── jest.config.js
│  ├── package.json
│  ├── src
│  │  ├── ast.ts
│  │  ├── jest.d.ts
│  │  ├── lexer.test.ts
│  │  ├── lexer.ts
│  │  ├── parser.test.ts
│  │  ├── parser.ts
│  │  ├── repl.ts
│  │  ├── token.ts
│  │  └── utils.ts
│  └── tsconfig.json
├── package.json
└── README.md
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `pnpm install`    | Installs dependencies                        |
| `pnpm test -r`    | run all tests                                |
