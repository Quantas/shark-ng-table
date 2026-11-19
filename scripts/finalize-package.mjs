// Runs after `ng build shark-ng-table`:
//  - copies README.md and LICENSE from the repo root into the package
//  - produces shark-ng-table.min.css (esbuild ships with @angular/build, so no extra dependency)
//  - completes the schematics that `tsc -p projects/shark-ng-table/tsconfig.schematics.json` compiled:
//    copies the JSON files and marks the folder CommonJS (the package itself is "type": "module")
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';

const dist = 'dist/shark-ng-table';

if (!existsSync(`${dist}/package.json`)) {
  console.error(`${dist} not found, run "ng build shark-ng-table" first`);
  process.exit(1);
}

for (const file of ['README.md', 'LICENSE']) {
  copyFileSync(file, `${dist}/${file}`);
}

await build({
  entryPoints: [`${dist}/shark-ng-table.css`],
  outfile: `${dist}/shark-ng-table.min.css`,
  minify: true,
  logLevel: 'warning',
});

const schematicsSrc = 'projects/shark-ng-table/schematics';
if (!existsSync(`${dist}/schematics/ng-add/index.js`)) {
  console.error(`${dist}/schematics not compiled, run "tsc -p projects/shark-ng-table/tsconfig.schematics.json" first`);
  process.exit(1);
}
for (const file of ['collection.json', 'ng-add/schema.json']) {
  copyFileSync(`${schematicsSrc}/${file}`, `${dist}/schematics/${file}`);
}
writeFileSync(`${dist}/schematics/package.json`, JSON.stringify({ type: 'commonjs' }, null, 2) + '\n');

console.log(`Finalized ${dist}`);
