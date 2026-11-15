# Releasing shark-ng-table

Releases are published to npm by the [Release workflow](.github/workflows/release.yml) when a GitHub release is published. It uses [npm trusted publishing](https://docs.npmjs.com/trusted-publishers), so there is no npm token stored in GitHub, and every version is published with a [provenance attestation](https://docs.npmjs.com/generating-provenance-statements).

## One-time setup

1. **On npmjs.com**, open the `shark-ng-table` package, go to **Settings → Trusted publishing** and add a GitHub Actions publisher:
   - Organization or user: `sharkops-io`
   - Repository: `shark-ng-table`
   - Workflow filename: `release.yml`
   - Environment: `npm`
2. **In GitHub**, create an environment named `npm` (**Settings → Environments**). Optionally add yourself as a required reviewer, so every publish waits for your approval.
3. Once a release has been published this way, consider setting **Publishing access** on npm to "Require two-factor authentication and disallow tokens" so the package can only be published through the workflow.

## Releasing a version

1. Update `version` in `projects/shark-ng-table/package.json` and add an entry to `CHANGELOG.md`.
2. Merge to `master` and wait for CI to pass.
3. Create a GitHub release with a tag that matches the version exactly, for example `v8.0.0`.
   - Mark it as a **pre-release** to publish under the `next` dist-tag (for example `v8.1.0-rc.0`).
4. The Release workflow runs CI (lint, tests, Angular compatibility builds), checks the tag matches the package version, builds and publishes.

The docs site deploys from `master` on every push via the [Docs workflow](.github/workflows/docs.yml) to https://shark-ng-table.sharkops.io/. The old address, www.quantasnet.com/shark-ng-table/, redirects there from the `Quantas/quantas.github.io` repository.

## Code coverage

Every CI run writes a coverage table to its job summary (open the run in the Actions tab). Run `npm run test:coverage` to see the same numbers locally.

CI fails if coverage drops below the floors in `coverageThresholds` (in `angular.json`): 90% lines, 85% statements, 85% branches, 75% functions. Raise them as coverage improves; don't lower them to get a change through.

## Supporting a new Angular major

1. Approve the Angular major update from Renovate's Dependency Dashboard issue, or run `ng update @angular/core@<major> @angular/cli@<major>` locally.
2. Add the new major to `peerDependencies` in `projects/shark-ng-table/package.json` and to the `compat` matrix in `.github/workflows/ci.yml`.
3. Drop majors that Angular no longer supports from both places, and update the version table in `README.md` and on the docs home page.
