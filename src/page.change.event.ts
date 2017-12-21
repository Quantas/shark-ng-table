import { CurrentSort } from './sort.type';

export interface SharkPageChangeEvent {
  pageNo: number;
  filter?: string;
  sorts?: CurrentSort[];
  sortString?: string;
}
