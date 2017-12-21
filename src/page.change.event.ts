import { CurrentSort } from './sort.type';

export interface PageChangeEvent {
  pageNo: number;
  filter?: string;
  sorts?: CurrentSort[];
  sortString?: string;
}
