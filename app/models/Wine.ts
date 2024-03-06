import Winemaker from './Winemaker';

type Wine = {
  id: string;
  name: string;
  year: number;
  grapeVariety: string;
  heritage: string;
  winemaker: Winemaker;
  createdAt: string;
  updatedAt: string;
};

export function isWine(obj: unknown): obj is Wine {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'name' in obj &&
    'year' in obj &&
    'grapeVariety' in obj &&
    'heritage' in obj &&
    'createdAt' in obj &&
    'updatedAt' in obj
  );
}

export function isWineArray(obj: unknown): obj is Wine[] {
  return Array.isArray(obj) && obj.every((wine: unknown) => isWine(wine));
}
export default Wine;
