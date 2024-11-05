import { ProductType } from "../types/TItem";

export const hasProductKeys = (item: object): boolean => {
    const itemKeys = Object.keys(item);
    const productKeys = ['name', 'price', 'id'];
    const hasOnlyProductKeys = itemKeys.every(key => productKeys.includes(key)) && itemKeys.length === productKeys.length;

    return hasOnlyProductKeys &&
        "name" in item && typeof (item as any).name === 'string' &&
        "price" in item && typeof (item as any).price === 'number' &&
        "id" in item && typeof (item as any).id === 'number';
}

export const isProduct = (item: string | object): boolean => {
    if (typeof item === 'string') {
        const objectItem = JSON.parse(item);
        if (typeof objectItem === 'object' && hasProductKeys(objectItem)) {
            return true;
        }
    }
    if (typeof item === 'object' && hasProductKeys(item)) {
        return true;
    }
    return false;
}

export const isBanane = (item: string | object): boolean => {
    if (isProduct(item)) {
        return (item as ProductType).name.toLowerCase() === 'banane';
    }
    return false;
}