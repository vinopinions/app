import Wine from './Wine';

type Store = {
    id?: string;
    name: string;
    address?: string;
    url?: string;
    wines: Wine[] | undefined;
};

export const isStore = (obj: unknown): obj is Store => {
    return typeof obj === 'object' && 'id' in obj && 'name' in obj && 'address' in obj && 'url' in obj && 'wines' in obj;
};

export const isStoreArray = (obj: unknown): obj is Store[] => {
    return Array.isArray(obj) && obj.every((store: unknown) => isStore(store));
};

export default Store;
