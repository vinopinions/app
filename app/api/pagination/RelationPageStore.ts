import Page from '../../models/Page';

type RelationPageStore<T> = { [key: string]: Page<T> };

export default RelationPageStore;
