import { async } from '@angular/core/testing';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { SharkColumn, SharkTableUtils } from '../table';

describe('SharkTableUtils', () => {

  it('should apply a no args pipe', async(() => {

    const tableUtils = new SharkTableUtils();

    expect(tableUtils.applyPipe(UpperCasePipe, 'a', undefined, undefined))
      .toEqual('A');
  }));

  it('should apply an args pipe', async(() => {

    const tableUtils = new SharkTableUtils();

    expect(tableUtils.applyPipe(CurrencyPipe, '123.45', ['USD', true], ['en-US']))
      .toEqual('$123.45');
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

  it('should filter by 2 columns', async(() => {
    const data = [
      {col1: '1', col2: 'a', col3: 'z'},
      {col1: '2', col2: 'b', col3: 'z'},
      {col1: '3', col2: 'c', col3: 'z'}
    ];

    const columns: SharkColumn[] = [
      {
        header: 'Column 1',
        property: 'col1',
        filter: '1'
      },
      {
        header: 'Column 2',
        property: 'col2',
        filter: ''
      },
      {
        header: 'Column 3',
        property: 'col3',
        filter: 'z'
      }
    ];

    const tableUtils = new SharkTableUtils();

    expect(tableUtils.filter(data, columns, true, ''))
      .toEqual([ {col1: '1', col2: 'a', col3: 'z'} ]);
  }));

  it('should export un-rendered data', async(() => {

    const columns: SharkColumn[] = [
      {
        header: 'Column 1',
        property: 'col1',
        filter: '',
        displayed: true
      },
      {
        header: 'Column 2',
        property: 'col2',
        filter: '',
        displayed: true
      }
    ];

    const tableUtils = new SharkTableUtils();

    expect(tableUtils.exportRow({col1: '1', col2: 'a', col3: 'z'}, columns, false)).toEqual({col1: '1', col2: 'a'});
  }));

});
