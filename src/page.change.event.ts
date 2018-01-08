import { SharkCurrentSort } from './sort.type';
import { SharkColumn } from './column';

export interface SharkPageChangeEvent {
  pageNo: number;
  columns: SharkColumn[];
  filter?: string;
  sorts?: SharkCurrentSort[];
  sortString?: string;
}
