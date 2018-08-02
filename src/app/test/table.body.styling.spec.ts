import { async } from '@angular/core/testing';
import { SharkTableBodyComponent } from '../table/table.body.component';
import { SharkTableUtils } from '../table';

describe('SharkTableBody', () => {

  it('should add a background-color style', async(() => {

    const bodyComponent = new SharkTableBodyComponent(undefined, new SharkTableUtils());
    bodyComponent.cellStylingFunction = (row, column, cellData) => {
      return {'background-color': 'red'};
    };

    expect(bodyComponent.addStyleToCell({'col1': 'stuff'}, { property: 'col1', header: 'Col 1'}))
      .toEqual({'background-color': 'red'});
  }));

  it('should not add style', async(() => {

    const bodyComponent = new SharkTableBodyComponent(undefined, new SharkTableUtils());

    expect(bodyComponent.addStyleToCell({'col1': 'stuff'}, { property: 'col1', header: 'Col 1'}))
      .toEqual(null);
  }));

});
