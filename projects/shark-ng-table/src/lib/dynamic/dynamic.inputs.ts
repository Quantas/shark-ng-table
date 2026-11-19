import { ComponentRef, Type, reflectComponentType } from '@angular/core';

const declaredInputs = new WeakMap<Type<unknown>, ReadonlySet<string>>();

function inputsOf(type: Type<unknown>): ReadonlySet<string> {
  let inputs = declaredInputs.get(type);
  if (!inputs) {
    inputs = new Set(reflectComponentType(type)?.inputs.map(input => input.templateName) ?? []);
    declaredInputs.set(type, inputs);
  }
  return inputs;
}

/**
 * Passes a value to a custom cell or child row component.
 *
 * Components that declare `name` as an input (`@Input()` or a signal `input()`, aliased or not)
 * get it through {@link ComponentRef.setInput}, which also marks OnPush components for check.
 * Components that only have a plain property keep getting it assigned, as before.
 */
export function setDynamicInput(componentRef: ComponentRef<unknown>, name: 'data' | 'row', value: unknown): void {
  if (inputsOf(componentRef.componentType).has(name)) {
    componentRef.setInput(name, value);
  } else {
    (componentRef.instance as Record<string, unknown>)[name] = value;
  }
}
