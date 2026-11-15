import { SharkTableBodyComponent } from '../lib/table.body.component';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

describe('SharkTableBody', () => {

  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('should add a background-color style', async () => {

    const bodyComponent = TestBed.runInInjectionContext(() => new SharkTableBodyComponent());
    bodyComponent.cellStylingFunction = () => {
      return {'background-color': 'red'};
    };

    expect(bodyComponent.addStyleToCell({'col1': 'stuff'}, { property: 'col1', header: 'Col 1'}))
      .toEqual({'background-color': 'red'});
  });

  it('should not add style', async () => {

    const bodyComponent = TestBed.runInInjectionContext(() => new SharkTableBodyComponent());

    expect(bodyComponent.addStyleToCell({'col1': 'stuff'}, { property: 'col1', header: 'Col 1'}))
      .toEqual(null);
  });

});
