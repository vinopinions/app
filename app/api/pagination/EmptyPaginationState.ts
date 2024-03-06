import PaginationState from './PaginationState';

export const EmptyPaginationState: PaginationState<any> = {
  data: [],
  meta: {
    page: 0,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

export default EmptyPaginationState;
