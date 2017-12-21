import { SharkCurrentSort } from './sort.type';

export interface SharkPageChangeEvent {
  pageNo: number;
  filter?: string;
  sorts?: SharkCurrentSort[];
  sortString?: string;
}
