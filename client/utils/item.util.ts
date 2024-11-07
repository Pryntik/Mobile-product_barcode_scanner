import checkIcon from "../assets/img/check.png";
import unknownIcon from "../assets/img/unknown.png";
import crossIcon from "../assets/img/cross.png";
import pUnknown from "../assets/product/p_unknown.png";
import { AllProductType, MaybeProductType, Nullable, productCardDefault, ProductCardType, ProductExtendType, ProductSaveType, ProductType, validProducts } from "../types/TItem";
import { ImageSourcePropType } from "react-native";
import { getAllProductsDB } from "../services/db";

/**
 * Checks if the given item has the keys and types of a ProductType.
 * 
 * @param item - The item to check.
 * @returns True if the item has the keys and types of a ProductType, false otherwise.
 */
export function hasProductKeys(item: object): boolean {
    const itemKeys = Object.keys(item);
    const productKeys = ['name', 'price'];
    const hasOnlyProductKeys = itemKeys.every(key => productKeys.includes(key)) && itemKeys.length === productKeys.length;

    return hasOnlyProductKeys &&
        "name" in item && typeof (item as any).name === 'string' &&
        "price" in item && typeof (item as any).price === 'number';
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
 * Determines if the given item is a valid ProductType.
 * 
 * @param item - The item to check.
 * @returns True if the item is a valid ProductType, false otherwise.
 */
export function isValidProduct(item: MaybeProductType): boolean {
    return isProduct(item) && validProducts.some(p => p.name === (item as ProductType).name);
}

/**
 * Parses a stringified item into a ProductType.
 * 
 * @param item - The item to parse.
 * @returns The parsed ProductType if successful, null otherwise.
 * @warning JSON.parse does not key without double quotes.
 * @warning JSON.parse does not accept commas at the end of an array or object.
 * @example JSON.parse('{"name": "Banane", "price": 199,}') returns null
 *                                                     ^
 */
export function parseProduct(item: MaybeProductType): Nullable<ProductType> {
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

/**
 * Parses a ProductType into a string.
 * 
 * @param item - The item to parse.
 * @returns The parsed string if successful, null otherwise.
 */
export function parseProductOrStringify(item: MaybeProductType): ProductType | string {
    return parseProduct(item) || shortProduct(item);
}

export function parsePrice(price: Nullable<number>, symbole: string): string {
    if (price) {
        if (price.toString().length === 1) return '0.0' + price + symbole;
        if (price.toString().length === 2) return '0.' + price + symbole;
        const priceBeforeCommat = price.toString().slice(0, -2);
        const priceAfterCommat = price.toString().slice(-2);
        return priceBeforeCommat + '.' + priceAfterCommat + symbole;
    }
    return '0.00' + symbole;
}

/**
 * Retrieves a ProductType from the given item.
 * 
 * @param item - The item to retrieve the ProductType from.
 * @returns The ProductType if the item is valid, null otherwise.
 */
export function getProduct(item: MaybeProductType): Nullable<ProductType> {
    if (typeof item === 'string' && isProduct(item)) {
        return parseProduct(item);
    }
    if (typeof item === 'object' && item !== null && hasProductKeys(item)) {
        return item as ProductType;
    }
    return null;
}

export async function getProductSave(item: MaybeProductType): Promise<Nullable<ProductSaveType>> {
    const product = getProduct(item);
    if (product) {
        const id = await getProductId();
        return {
            id: id,
            name: getProductName(product),
            price: getProductPrice(product),
            quantity: getProductQuantity(product),
        };
    }
    return null;
}

/**
 * Returns a product card object with default values if the product information is incomplete.
 *
 * @param {MaybeProductType} item - The item which may or may not be a complete product.
 * @returns {ProductCardType} An object containing the product card details.
 */
export async function getProductCard(item: MaybeProductType): Promise<ProductCardType> {
    const product = getProduct(item);
    if (product) {
        const id = await getProductId();
        return {
            id: id,
            name: getProductName(product),
            price: getProductPrice(product),
            quantity: getProductQuantity(product),
            icon: getProductIcon(product),
            statusIcon: getIconStatus(product),
        };
    }
    return productCardDefault;
}

/**
 * Retrieves a ProductType from the given item.
 * 
 * @param item - The item to retrieve the ProductType from.
 * @returns The ProductType if the item is valid, null otherwise.
 */
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


/**
 * Creates a ProductType.
 * 
 * @param name - The name of the product.
 * @param price - The price of the product.
 * @returns The created ProductType.
 */
export function createProduct(name: string, price: number): ProductType {
    return { name, price };
}

export async function getProductId(): Promise<number> {
    return getAllProductsDB().then((products) => products.length + 1).catch(() => 1);
}

export function getProductName(item: AllProductType): string {
    const product = item as ProductType;
    return product && product.name ? product.name : 'Product unknown';
}

export function getProductPrice(item: AllProductType): number {
    const product = item as ProductType;
    return product && product.price ? product.price : 0;
}

export function getProductQuantity(item: AllProductType): number {
    const product = item as ProductExtendType;
    return product && product.quantity ? product.quantity : 1;
}

export function getProductIcon(item: MaybeProductType): ImageSourcePropType {
    const product = validProducts.find(p => p.name === (item as ProductType).name);
    return product && product.icon ? product.icon : pUnknown;
}

export function getIconStatus(item: MaybeProductType): ImageSourcePropType {
    if (typeof item === 'string') {
        switch (item) {
            case 'check': return checkIcon;
            case 'unknown': return unknownIcon;
            default: return crossIcon;
        }
    }

    if (isProduct(item)) {
        if (isValidProduct(item)) {
            return checkIcon;
        }
        return unknownIcon;
    }
    return crossIcon;
}