import { SharkColumn } from './column';

export class SharkColumnChangeEvent {
  columns: SharkColumn[];
  currentSortString: string;
}
