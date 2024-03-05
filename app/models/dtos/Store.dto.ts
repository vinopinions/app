import Wine from '../Wine';

type StoreDto = {
  name: string;
  address?: string;
  url?: string;
  wines: Wine[] | undefined;
};

export default StoreDto;
