import FetchPageParams from './FetchPageParams';

type FilterFetchPageParams = FetchPageParams & {
  filter?: string;
};

export default FilterFetchPageParams;
