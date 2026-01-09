# Contributing to ASCIIRender

First off, thank you for considering contributing to ASCIIRender! It's people like you that make ASCIIRender such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots** if possible.

### Suggesting Enhancements

If you have a suggestion for a new feature or enhancement:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/asciirender.git
cd asciirender

# Install dependencies
npm install

# Run the demo app
npm run dev

# Build the library
npm run build:lib

# Run type checking
npm run typecheck
```

## Project Structure

```
asciirender/
├── src/                    # Library source code
│   ├── components/         # React components
│   ├── utils/              # Utility functions
│   ├── types.ts            # TypeScript types
│   ├── constants.ts        # Constants and presets
│   └── index.ts            # Library entry point
├── demo/                   # Demo application
├── dist/                   # Built library (generated)
└── ...config files
```

## Style Guide

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
