import Store from '../../api/pagination/Store';

type CreateStoreDto = Pick<Store, 'name' | 'url' | 'address'> & {
  imageUri?: string;
};

export default CreateStoreDto;
