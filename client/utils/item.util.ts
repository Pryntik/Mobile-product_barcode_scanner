import { MaybeProductType, ProductType } from "../types/TItem";

/**
 * Checks if the given item has the keys and types of a ProductType.
 * 
 * @param item - The item to check.
 * @returns True if the item has the keys and types of a ProductType, false otherwise.
 */
export function hasProductKeys(item: object): boolean {
    const itemKeys = Object.keys(item);
    const productKeys = ['name', 'price', 'id'];
    const hasOnlyProductKeys = itemKeys.every(key => productKeys.includes(key)) && itemKeys.length === productKeys.length;

    return hasOnlyProductKeys &&
        "name" in item && typeof (item as any).name === 'string' &&
        "price" in item && typeof (item as any).price === 'number' &&
        "id" in item && typeof (item as any).id === 'number';
}

/**
 * Determines if the given item is a ProductType.
 * 
 * @param item - The item to check.
 * @returns True if the item is a ProductType, false otherwise.
 */
export function isProduct(item: MaybeProductType): boolean {
    if (typeof item === 'string') {
        return parseProduct(item) !== null;
    }
    if (typeof item === 'object' && item !== null && hasProductKeys(item)) {
        return true;
    }
    return false;
}

/**
 * Parses a stringified item into a ProductType.
 * 
 * @param item - The item to parse.
 * @returns The parsed ProductType if successful, null otherwise.
 * @warning JSON.parse does not key without double quotes.
 * @warning JSON.parse does not accept commas at the end of an array or object.
 * @example JSON.parse('{"name": "Banane", "price": 199, "id": 1,}') returns null
 *                                                              ^
 */
export function parseProduct(item: MaybeProductType): ProductType | null {
    if (typeof item === 'string') {
        try {
            const objectItem = JSON.parse(item);
            if (typeof objectItem === 'object' && hasProductKeys(objectItem)) {
                return objectItem as ProductType;
            }
        }
        catch (e) {
            return null;
        }
    }
    return null;
}

export function parseProductOrStringify(item: MaybeProductType): ProductType | string {
    return parseProduct(item) || shortProduct(item);
}

/**
 * Retrieves a ProductType from the given item.
 * 
 * @param item - The item to retrieve the ProductType from.
 * @returns The ProductType if the item is valid, null otherwise.
 */
export function getProductFromItem(item: MaybeProductType) {
    if (typeof item === 'string' && isProduct(item)) {
        return parseProduct(item);
    }
    if (typeof item === 'object' && item !== null && hasProductKeys(item)) {
        return item as ProductType;
    }
    return null;
}

export function shortProduct(product: MaybeProductType): string {
    return JSON.stringify(product).trim();
}

/**
 * Checks if the given item is a ProductType and if its name matches the given name.
 * 
 * @param item - The item to check.
 * @param nameSearch - The name to compare with the item's name.
 * @returns True if the item is a ProductType and its name matches the given name, false otherwise.
 */
export function isNameProduct(item: MaybeProductType, nameSearch: string): boolean {
    if (isProduct(item)) {
        return (item as ProductType).name.toLowerCase() === nameSearch.toLowerCase();
    }
    return false;
}