/**
 * TypeScript implementation of the Spring Data Page object
 */
export interface Page {
  content?: any[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  sorts?: Sort[];
}

export interface Sort {
  direction: string;
  property: string;
  descending: boolean;
  ascending: boolean;
}
