# Contributing

Thanks for contributing!

## About

The repo is split up into [`lib`](./lib) for the main library code and [`example`](./example) for
demos and testing.

If you're on Windows, it's recommended that you use WSL.

## Standards

- Commits use the [Conventional Commits](https://conventionalcommits.org/) standard
- pnpm to manage dependencies
- [fnm](https://github.com/Schniz/fnm) or [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions
- EditorConfig and Biome for formatting
- Biome for linting
- Husky for Git hooks

## Getting Started

Ensure you're using the Node version specified in [.nvmrc](./.nvmrc) and run the following to
set up the project:

```sh
npm run bootstrap
```

Then run the following:

```sh
# Run both the library dev build and the `example` repo dev server
pnpm -r run start

# Or run them separately
## Start the library dev build
pnpm run --filter ./lib start
## Start the `example` codebase dev build
pnpm run --filter ./example start
```

## VS Code

If you're using VS Code please make sure you install the [recommended extensions](./.vscode/extensions.json).
