import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { readWorkspace, updateWorkspace } from '@schematics/angular/utility';

export interface NgAddOptions {
  /** The application to add the stylesheet to. Defaults to the only application in the workspace. */
  project?: string;
}

export const STYLESHEET = 'node_modules/shark-ng-table/shark-ng-table.min.css';

type StyleEntry = string | { input?: string };

const styleInput = (entry: StyleEntry): string | undefined => typeof entry === 'string' ? entry : entry?.input;

/**
 * `ng add shark-ng-table`: the Angular CLI installs the package, then this adds the table's
 * stylesheet to the application's `build` target, unless the app already includes it
 * (in angular.json or with an `@import` in one of its global stylesheets).
 */
export function ngAdd(options: NgAddOptions): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await readWorkspace(tree);
    const applications = [...workspace.projects]
      .filter(([, project]) => project.extensions['projectType'] === 'application')
      .map(([name]) => name);

    let projectName = options.project;
    if (!projectName) {
      if (applications.length !== 1) {
        throw new SchematicsException(
          applications.length === 0
            ? 'No application found in this workspace. Add the shark-ng-table stylesheet by hand, see https://shark-ng-table.sharkops.io/#/guide/styling'
            : `More than one application found (${applications.join(', ')}). Run "ng add shark-ng-table --project <name>".`);
      }
      projectName = applications[0];
    }

    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(`Project "${projectName}" not found in this workspace.`);
    }
    const build = project.targets.get('build');
    if (!build) {
      throw new SchematicsException(`Project "${projectName}" has no build target. Add the shark-ng-table stylesheet by hand, see https://shark-ng-table.sharkops.io/#/guide/styling`);
    }

    const styles = (build.options?.['styles'] as StyleEntry[] | undefined) ?? [];
    const inputs = styles.map(styleInput).filter((input): input is string => !!input);

    if (inputs.some(input => input.includes('shark-ng-table'))) {
      context.logger.info(`shark-ng-table: the stylesheet is already in the styles of "${projectName}".`);
      return printNextSteps(context);
    }

    const importedFrom = inputs.find(input => tree.exists(input) && tree.readText(input).includes('shark-ng-table'));
    if (importedFrom) {
      context.logger.info(`shark-ng-table: ${importedFrom} already imports the stylesheet.`);
      return printNextSteps(context);
    }

    return updateWorkspace(workspace => {
      const target = workspace.projects.get(projectName)!.targets.get('build')!;
      target.options ??= {};
      target.options['styles'] = [STYLESHEET, ...((target.options['styles'] as StyleEntry[] | undefined) ?? [])];
      context.logger.info(`shark-ng-table: added ${STYLESHEET} to the styles of "${projectName}".`);
      printNextSteps(context);
    });
  };
}

function printNextSteps(context: SchematicContext): void {
  context.logger.info('shark-ng-table: import SharkTableComponent in the components that use <shark-table>. Guide: https://shark-ng-table.sharkops.io/');
}
