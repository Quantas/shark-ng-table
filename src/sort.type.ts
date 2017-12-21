export enum SortType {
  NONE,
  ASC,
  DESC
}

export class CurrentSort {
  property: string;
  sortType: SortType;
}
