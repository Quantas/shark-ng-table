#!/usr/bin/env bash
# Builds a fresh Angular app of the given major version against the packed library.
# Proves the published package installs with `ng add`, and compiles and links with that Angular version.
#
# usage: scripts/compat-check.sh <angular-major> <path-to-shark-ng-table.tgz> [work-dir]
set -euo pipefail

ANGULAR_MAJOR="$1"
TARBALL="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"
WORK_DIR="${3:-$(mktemp -d)}"

echo "Creating Angular ${ANGULAR_MAJOR} app in ${WORK_DIR}"
cd "${WORK_DIR}"
npx -y "@angular/cli@${ANGULAR_MAJOR}" new compat-app \
  --defaults --skip-git --skip-tests --style=css --ssr=false --zoneless=false >/dev/null
cd compat-app
npx ng add "${TARBALL}" --skip-confirmation

# ng add must have put the stylesheet into the build target.
node -e '
  const p = Object.values(require("./angular.json").projects)[0];
  const styles = p.architect.build.options.styles;
  if (styles[0] !== "node_modules/shark-ng-table/shark-ng-table.min.css") {
    console.error("ng add did not add the stylesheet, styles are:", JSON.stringify(styles));
    process.exit(1);
  }
'

# A component that uses the standalone API, the NgModule wrapper, and custom cell and child row
# components with a plain property and with signal inputs.
cat > src/app/app.ts <<'EOF'
import { Component, NgModule, computed, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Page, SharkColumn, SharkDynamicContents, SharkTableComponent, SharkTableModule } from 'shark-ng-table';

@Component({
  selector: 'app-make',
  template: `<strong>{{ data }}</strong>`
})
export class MakeCell implements SharkDynamicContents {
  data: unknown;
  childOpen(): void {}
}

@Component({
  selector: 'app-model',
  template: `<em>{{ label() }}</em>`
})
export class ModelCell implements SharkDynamicContents {
  readonly data = input.required<string>();
  readonly row = input.required<{ year: number }>();
  protected readonly label = computed(() => `${this.data()} ${this.row().year}`);
}

@Component({
  selector: 'app-detail',
  template: `<p>{{ data().make }}</p>`
})
export class Detail implements SharkDynamicContents {
  readonly data = input.required<{ make: string }>();
}

@NgModule({ imports: [SharkTableModule], exports: [SharkTableModule] })
export class LegacyModule {}

@Component({
  selector: 'app-root',
  imports: [SharkTableComponent, LegacyModule],
  template: `
    <shark-table caption="Cars" [data]="cars" [columns]="columns" [columnPicker]="true" [localPagingSize]="5"
                 [childRows]="true" [childComponent]="detail" (pageChange)="pages = pages + 1"></shark-table>
    <shark-table caption="Paged" [data]="page" [columns]="columns" [serverSideData]="true"></shark-table>
  `
})
export class App {
  pages = 0;
  detail = Detail;
  cars = [{ year: 2017, make: 'Subaru', model: 'WRX', price: 30000 }];
  page: Page = { number: 0, totalPages: 1, totalElements: 1, content: this.cars };
  columns: SharkColumn[] = [
    { header: 'Year', property: 'year' },
    { header: 'Make', property: 'make', component: MakeCell },
    { header: 'Model', property: 'model', component: ModelCell },
    { header: 'Price', property: 'price', pipe: CurrencyPipe, pipeConstructorArgs: ['en-US'] }
  ];
}
EOF

# Routing is optional for the table; keep the generated providers as they are.
node -e '
  const fs = require("fs");
  const f = "angular.json";
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  const p = Object.values(j.projects)[0];
  p.architect.build.configurations.production.budgets = [];
  fs.writeFileSync(f, JSON.stringify(j, null, 2));
'

npx ng build
echo "Angular ${ANGULAR_MAJOR}: OK ($(node -p 'require("@angular/core/package.json").version'))"
