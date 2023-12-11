type Winemaker = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export function isWinemaker(obj: unknown): obj is Winemaker {
    return typeof obj === 'object' && 'id' in obj && 'name' in obj && 'createdAt' in obj && 'updatedAt' in obj;
}

export function isWinemakerArray(obj: unknown): obj is Winemaker[] {
    return Array.isArray(obj) && obj.every((wine: unknown) => isWinemaker(wine));
}

export default Winemaker;
