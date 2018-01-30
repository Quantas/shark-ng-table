import {  async, } from '@angular/core/testing';
import { SharkTableHeaderButtonComponent } from '../src/header-button.component';

describe('SharkTableHeaderButtonComponent', () => {

  it('should call focus and then blur', async(() => {
    const buttonComponent = new SharkTableHeaderButtonComponent();
    buttonComponent.column = {
      header: 'Col 1',
      property: 'col1'
    };

    buttonComponent.headerFocus();

    expect(buttonComponent.focusText).toEqual(', Click to change sort to Ascending');

    buttonComponent.headerBlur();

    expect(buttonComponent.focusText).toEqual(undefined);
  }));

});
