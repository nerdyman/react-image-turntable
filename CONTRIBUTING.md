# Contributing

Thanks for contributing!

## Getting Started

Ensure you're using the Node version specified in [.nvmrc](./.nvmrc) and run the following to
bootstrap the project:

```sh
npm run dx
```

Then run the following commands in separate terminals:

```sh
# Run both the library dev build and the `example` repo dev server
pnpm run dev

# Or run them separately
## Start the library dev build
pnpm run start
## Start the `example` codebase dev build
pnpm run --prefix example start
```

## Standards

- Commits use the [Conventional Commits](https://conventionalcommits.org/) standard
- pnpm to manage dependencies
- nvm to manage Node.js versions
- Prettier & EditorConfig for code style
- ESLint for quality
- Husky for Git hooks

## VS Code

If you're using VS Code please make sure you install the [recommended extensions](./.vscode/extensions.json).
