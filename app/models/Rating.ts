import User from './User';
import Wine from './Wine';

type Rating = {
    id?: string;
    stars: number;
    text: string;
    wine: Wine;
    user: User;
};

export function isRating(obj: unknown): obj is Rating {
    return typeof obj === 'object' && 'id' in obj && 'stars' in obj && 'text' in obj && 'wine' in obj && 'user' in obj;
}

export function isRatingArray(obj: unknown): obj is Rating[] {
    return Array.isArray(obj) && obj.every((rating: unknown) => isRating(rating));
}

export default Rating;
