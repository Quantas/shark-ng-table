# shark-ng-table Development

Typically we generate a new project with the Angular CLI and then link the `dist` directory into it as follows:

```bash
npm link ../shark-ng-table/dist
```

Additionally, in the .angular-cli.json file you need to make sure `defaults.build.preserveSymlinks` is set to `true` as in this example:

```json
  "defaults": {
    "styleExt": "css",
    "component": {},
    "build": {
      "preserveSymlinks": true
    }
```

Using NPM link on the dist directory means your test application will only receive updates after you run `npm run build` from the shark-ng-table project.
