// Prints the Vitest coverage summary as a Markdown table (used for the GitHub Actions job summary).
import { existsSync, readFileSync } from 'node:fs';

const file = 'coverage/shark-ng-table/coverage-summary.json';
if (!existsSync(file)) {
  console.log('### Coverage\n\nNo coverage report was produced.');
  process.exit(0);
}

const { total } = JSON.parse(readFileSync(file, 'utf8'));
const rows = ['lines', 'statements', 'branches', 'functions']
  .map(key => `| ${key[0].toUpperCase()}${key.slice(1)} | ${total[key].pct}% | ${total[key].covered} / ${total[key].total} |`);

console.log(['### Coverage', '', '| Metric | Covered | |', '| --- | ---: | ---: |', ...rows].join('\n'));
