import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Tree } from '@angular-devkit/schematics';

// Runs against the built package: `npm run build` first (npm run test:schematics does both).
const collectionPath = resolve('dist/shark-ng-table/schematics/collection.json');
const STYLESHEET = 'node_modules/shark-ng-table/shark-ng-table.min.css';

const runner = new SchematicTestRunner('shark-ng-table', collectionPath);
const angularRunner = new SchematicTestRunner('@schematics/angular', join(dirname(require.resolve('@schematics/angular/package.json')), 'collection.json'));

async function workspace(apps: string[] = ['demo'], library?: string): Promise<UnitTestTree> {
  let tree = await angularRunner.runSchematic('workspace', { name: 'ws', newProjectRoot: 'projects', version: '22.0.0' }, Tree.empty());
  for (const name of apps) {
    tree = await angularRunner.runSchematic('application', { name, standalone: true, skipTests: true, style: 'css' }, tree);
  }
  if (library) {
    tree = await angularRunner.runSchematic('library', { name: library, skipPackageJson: true }, tree);
  }
  return tree;
}

const styles = (tree: UnitTestTree, project = 'demo') =>
  JSON.parse(tree.readText('angular.json')).projects[project].architect.build.options.styles as unknown[];

describe('ng add shark-ng-table', () => {

  let tree: UnitTestTree;

  beforeEach(async () => {
    tree = await workspace();
  });

  test('adds the stylesheet first in the styles of the only application', async () => {
    const result = await runner.runSchematic('ng-add', {}, tree);
    assert.deepEqual(styles(result), [STYLESHEET, 'projects/demo/src/styles.css']);
  });

  test('picks the only application when the workspace also has a library', async () => {
    const result = await runner.runSchematic('ng-add', {}, await workspace(['demo'], 'lib'));
    assert.equal(styles(result)[0], STYLESHEET);
  });

  test('is idempotent', async () => {
    const once = await runner.runSchematic('ng-add', {}, tree);
    const twice = await runner.runSchematic('ng-add', {}, once);
    assert.deepEqual(styles(twice), [STYLESHEET, 'projects/demo/src/styles.css']);
  });

  test('leaves angular.json alone when the stylesheet is already listed', async () => {
    const json = JSON.parse(tree.readText('angular.json'));
    json.projects.demo.architect.build.options.styles = ['node_modules/shark-ng-table/shark-ng-table.css'];
    tree.overwrite('angular.json', JSON.stringify(json));
    const result = await runner.runSchematic('ng-add', {}, tree);
    assert.deepEqual(styles(result), ['node_modules/shark-ng-table/shark-ng-table.css']);
  });

  test('recognises object style entries', async () => {
    const json = JSON.parse(tree.readText('angular.json'));
    json.projects.demo.architect.build.options.styles = [{ input: 'node_modules/shark-ng-table/shark-ng-table.min.css', inject: true }];
    tree.overwrite('angular.json', JSON.stringify(json));
    const result = await runner.runSchematic('ng-add', {}, tree);
    assert.equal(styles(result).length, 1);
  });

  test('leaves angular.json alone when a global stylesheet already imports it', async () => {
    tree.overwrite('projects/demo/src/styles.css', `@import 'shark-ng-table/shark-ng-table.min.css';\n`);
    const result = await runner.runSchematic('ng-add', {}, tree);
    assert.deepEqual(styles(result), ['projects/demo/src/styles.css']);
  });

  test('creates the styles array when the build target has none', async () => {
    const json = JSON.parse(tree.readText('angular.json'));
    delete json.projects.demo.architect.build.options.styles;
    tree.overwrite('angular.json', JSON.stringify(json));
    const result = await runner.runSchematic('ng-add', {}, tree);
    assert.deepEqual(styles(result), [STYLESHEET]);
  });

  test('uses --project when there are several applications', async () => {
    const result = await runner.runSchematic('ng-add', { project: 'admin' }, await workspace(['demo', 'admin']));
    assert.equal(styles(result, 'admin')[0], STYLESHEET);
    assert.equal(styles(result, 'demo').includes(STYLESHEET), false);
  });

  test('asks for --project when there are several applications', async () => {
    await assert.rejects(runner.runSchematic('ng-add', {}, await workspace(['demo', 'admin'])), /More than one application found \(demo, admin\)/);
  });

  test('fails clearly for an unknown project', async () => {
    await assert.rejects(runner.runSchematic('ng-add', { project: 'nope' }, tree), /Project "nope" not found/);
  });

  test('fails clearly when the workspace has no application', async () => {
    await assert.rejects(runner.runSchematic('ng-add', {}, await workspace([], 'lib')), /No application found/);
  });

});
