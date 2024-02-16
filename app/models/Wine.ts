import Rating from './Rating';
import Store from './Store';
import Winemaker from './Winemaker';

type Wine = {
    id?: string;
    name: string;
    year: number;
    grapeVariety: string;
    heritage: string;
    winemaker?: Winemaker;
    stores?: Store[];
    ratings?: Rating[];
};

export function isWine(obj: unknown): obj is Wine {
    return (
        typeof obj === 'object' &&
        'id' in obj &&
        'name' in obj &&
        'year' in obj &&
        'grapeVariety' in obj &&
        'heritage' in obj
    );
}

export function isWineArray(obj: unknown): obj is Wine[] {
    return Array.isArray(obj) && obj.every((wine: unknown) => isWine(wine));
}
export default Wine;
