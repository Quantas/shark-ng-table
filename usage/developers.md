# Contributing

The repository is an Angular CLI workspace with two projects:

- `projects/shark-ng-table` is the library that is published to npm
- `projects/docs` is this documentation site

You need Node.js 22.22+, 24.15+ or 26+.

```bash
npm ci
npm start            # docs site with live reload at http://localhost:4200
npm test             # library unit tests (Vitest)
npm run lint         # ESLint, including template accessibility rules
npm run build        # builds the package into dist/shark-ng-table
npm run build:docs   # builds the docs site into dist/docs
```

The docs site imports the library from source, so changes show up immediately while `npm start` runs.

## Trying a build in another app

```bash
npm run build
cd dist/shark-ng-table && npm pack
# then in your app
npm install /path/to/shark-ng-table-8.0.0.tgz
```

## Releasing

Releases are published from GitHub Actions. See [RELEASING.md](../RELEASING.md).
