import { async } from '@angular/core/testing';
import { SharkColumn } from './column';
import { SharkTableUtils } from './table.utils';
import { UpperCasePipe } from '@angular/common';

describe('SharkTableUtils', () => {

  // FIXME: Type disappears during karma testing in this context
  xit('should apply a pipe', async(() => {

    const data = [
      {col1: 'a', col2: '1'},
      {col1: 'b', col2: '2'},
      {col1: 'c', col2: '3'}
    ];

    const columns: SharkColumn[] = [
      {
        header: 'Column 1',
        property: 'col1',
        pipe: UpperCasePipe,
        filter: ''
      },
      {
        header: 'Column 2',
        property: 'col2',
        filter: ''
      }
    ];

    const tableUtils = new SharkTableUtils();

    expect(tableUtils.filter(data, columns, true, ''))
      .toEqual([
        {col1: 'A', col2: '1'},
        {col1: 'B', col2: '2'},
        {col1: 'C', col2: '3'}
      ]);

  }));

  it('should filter by column', async(() => {

    const data = [
      {col1: '1', col2: 'a', col3: 'z'},
      {col1: '2', col2: 'b', col3: 'y'},
      {col1: '3', col2: 'c', col3: 'x'}
    ];

    const columns: SharkColumn[] = [
      {
        header: 'Column 1',
        property: 'col1',
        filter: '2'
      },
      {
        header: 'Column 2',
        property: 'col2',
        filter: ''
      },
      {
        header: 'Column 3',
        property: 'col3',
        filter: ''
      }
    ];

    const tableUtils = new SharkTableUtils();

    expect(tableUtils.filter(data, columns, true, ''))
      .toEqual([ {col1: '2', col2: 'b', col3: 'y'} ]);
  }));

});
