// Runs after `ng build shark-ng-table`:
//  - copies README.md and LICENSE from the repo root into the package
//  - produces shark-ng-table.min.css (esbuild ships with @angular/build, so no extra dependency)
import { copyFileSync, existsSync } from 'node:fs';
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

console.log(`Finalized ${dist}`);
