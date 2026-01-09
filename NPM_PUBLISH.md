# Publishing ASCIIRender to npm

This guide walks you through publishing the ASCIIRender package to npm.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** (comes with Node.js)
3. **npm account** - Create one at [npmjs.com](https://www.npmjs.com/signup)

## Step-by-Step Publishing Guide

### 1. Create an npm Account

If you don't have an npm account:

```bash
npm adduser
```

Or sign up at https://www.npmjs.com/signup

### 2. Login to npm

```bash
npm login
```

Enter your username, password, and email when prompted.

### 3. Verify Login

```bash
npm whoami
```

This should display your npm username.

### 4. Update Package Name (if needed)

Open `package.json` and ensure the package name is unique:

```json
{
  "name": "asciirender"
}
```

**Note:** If `asciirender` is already taken, try:
- `@yourusername/asciirender` (scoped package)
- `react-asciirender`
- `ascii-render-react`

### 5. Update Repository URLs

In `package.json`, update with your actual GitHub username:

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/YOUR_GITHUB_USERNAME/asciirender.git"
  },
  "homepage": "https://github.com/YOUR_GITHUB_USERNAME/asciirender#readme",
  "bugs": {
    "url": "https://github.com/YOUR_GITHUB_USERNAME/asciirender/issues"
  }
}
```

### 6. Build the Library

```bash
npm run build:lib
```

This will:
- Compile TypeScript
- Generate type definitions in `dist/`
- Bundle the library in ES and UMD formats

### 7. Verify the Build

Check the `dist/` folder contains:
- `asciirender.js` (ES module)
- `asciirender.umd.cjs` (CommonJS)
- `index.d.ts` (TypeScript definitions)

### 8. Test the Package Locally (Optional)

Create a test project to verify the package works:

```bash
# In the asciirender directory
npm pack

# This creates asciirender-1.0.0.tgz

# In a new test project directory
npm init -y
npm install ../path/to/asciirender-1.0.0.tgz
```

### 9. Publish to npm

```bash
npm publish
```

For scoped packages (e.g., `@yourusername/asciirender`):

```bash
npm publish --access public
```

### 10. Verify Publication

Visit your package page:
```
https://www.npmjs.com/package/asciirender
```

## Version Management

### Semantic Versioning

Follow [semver](https://semver.org/):
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes

### Updating Version

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features)
npm version minor

# Major release (breaking changes)
npm version major
```

Then publish:

```bash
npm run build:lib
npm publish
```

## Publishing Pre-releases

For beta/alpha versions:

```bash
# Beta
npm version 1.0.0-beta.1
npm publish --tag beta

# Alpha
npm version 1.0.0-alpha.1
npm publish --tag alpha
```

## Unpublishing (Emergency Only)

You can unpublish within 72 hours:

```bash
npm unpublish asciirender@1.0.0
```

**Warning:** This is discouraged. Prefer deprecating instead:

```bash
npm deprecate asciirender@1.0.0 "Critical bug, please update"
```

## Troubleshooting

### "Package name already taken"

Use a scoped package:

1. Update `package.json`:
   ```json
   {
     "name": "@yourusername/asciirender"
   }
   ```

2. Publish with public access:
   ```bash
   npm publish --access public
   ```

### "You must be logged in"

```bash
npm login
```

### "Permission denied"

Make sure you own the package or have publish rights.

### Build Errors

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build:lib
```

## Post-Publish Checklist

- [ ] Package visible on npmjs.com
- [ ] Test installation: `npm install asciirender`
- [ ] Verify import works in a new project
- [ ] Create a GitHub release with tag `v1.0.0`
- [ ] Announce on social media / dev communities

## Useful Commands

```bash
# View package info
npm info asciirender

# View all published versions
npm view asciirender versions

# Download statistics
npm-stat asciirender

# Check for vulnerabilities
npm audit
```

## Continuous Publishing (CI/CD)

For automated publishing with GitHub Actions, create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build:lib
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add your npm token as a GitHub secret named `NPM_TOKEN`.

---

**Congratulations!** 🎉 Your package is now live on npm!

Users can install it with:

```bash
npm install asciirender
```
