export enum SharkSortType {
  NONE,
  ASC,
  DESC
}

export class SharkCurrentSort {
  property: string;
  sortType: SharkSortType;
}
