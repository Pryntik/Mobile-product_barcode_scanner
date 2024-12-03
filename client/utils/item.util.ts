import checkIcon from "../assets/img/check.png";
import unknownIcon from "../assets/img/unknown.png";
import crossIcon from "../assets/img/cross.png";
import pUnknown from "../assets/product/p_unknown.png";
import { AllProductType, MaybeType, MaybeProductType, NullableType, ProductCardType, ProductExtendType, ProductSaveType, ProductType, ValidProducts, ProductCardUnknown, ItemCheckoutType, ItemPurchaseType } from "../types/TItem";
import { ImageSourcePropType } from "react-native";
import { getAllProductsDB, getInitialProductDB } from "../services/db";

/* GET */

/** Retrieves a ProductType from the given item.
 * 
 * @param item - The item to retrieve the ProductType from.
 * @returns The ProductType if the item is valid, null otherwise.
 */
export function getProduct(item: MaybeProductType): NullableType<ProductType> {
    if (typeof item === 'string' && isProduct(item)) {
        return parseProduct(item);
    }
    if (typeof item === 'object' && item !== null && hasProductKeys(item)) {
        return item as ProductType;
    }
    return null;
}

/** Retrieves a ProductSaveType from the given item.
 * 
 * @param item - The item to retrieve the ProductSaveType from.
 * @returns The ProductSaveType if the item is valid, null otherwise.
 */
export async function getProductSave(item: MaybeProductType, priceIsLock?: boolean, quantityIsLock?: boolean): Promise<NullableType<ProductSaveType>> {
    const product = getProduct(item);
    if (product) {
        const id = await getProductId(product.name);
        const price = await getProductPrice(product, priceIsLock);
        return {
            id: id,
            name: getProductName(product),
            price: price,
            quantity: getProductQuantity(product, quantityIsLock),
        };
    }
    return null;
}

export async function getProductSaveFromCard(product: ProductCardType, priceIsLock?: boolean, quantityIsLock?: boolean): Promise<ProductSaveType> {
    const id = await getProductId(product.name);
    const price = await getProductPrice(product, priceIsLock);
    return {
        id: id,
        name: getProductName(product),
        price: price,
        quantity: getProductQuantity(product, quantityIsLock),
    };
}

export async function getProductCardFromSave(product: ProductSaveType, priceIsLock?: boolean, quantityIsLock?: boolean): Promise<ProductCardType> {
    const id = await getProductId(product.name);
    const price = await getProductPrice(product, priceIsLock);
    return {
        id: id,
        name: getProductName(product),
        price: price,
        quantity: getProductQuantity(product, quantityIsLock),
        icon: getProductIcon(product),
        statusIcon: getProductIconStatus(product),
    };
}

export function getProductCheckoutFromSave(product: ProductSaveType): ItemCheckoutType {
    return {
        id: product.id,
        amount: product.price / 100,
    };
}

export function getItemPurchaseLength(items: ItemPurchaseType[]): number {
    return items.reduce((total, item) => {
        return item ? total + 1 : total;
    }, 0);
}

export function getItemPurchaseAmount(items: ItemPurchaseType[]): number {
    return items.reduce((total, item) => {
        return total + item.amount;
    }, 0);
}

/** Returns a product card object with default values if the product information is incomplete.
 *
 * @param {MaybeProductType} item - The item which may or may not be a complete product.
 * @returns {ProductCardType} An object containing the product card details.
 */
export async function getProductCard(item: MaybeProductType, priceIsLock?: boolean, quantityIsLock?: boolean): Promise<ProductCardType> {
    const product = getProduct(item);
    if (product) {
        const id = await getProductId(product.name);
        const price = await getProductPrice(product, priceIsLock);
        return {
            id: id,
            name: getProductName(product),
            price: price,
            quantity: getProductQuantity(product, quantityIsLock),
            icon: getProductIcon(product),
            statusIcon: getProductIconStatus(product),
        };
    }
    return ProductCardUnknown;
}

/** Retrieves a ProductCardType from the given item.
 * 
 * @param item - The item to retrieve the ProductCardType from.
 * @returns The ProductCardType if the item is valid, null otherwise.
 */
export async function getProductId(productName?: MaybeType<string>): Promise<number> {
    if (productName) {
        const id = await getProductIdByName(productName);
        if (id) return id;
    }
    const products = await getAllProductsDB();
    if (products.length === 0) return 1;
    return products.length + 1;
}

export function getProductName(product: AllProductType): string {
    return product && product.name ? product.name : 'Product unknown';
}

export async function getProductIdByName(name: string): Promise<MaybeType<number>> {
    const products = await getAllProductsDB();
    return products.find(p => p.name === name)?.id;
}

export async function getProductPrice(product: AllProductType, priceIsLock?: boolean): Promise<number> {
    if (priceIsLock) {
        const initialProduct = await getInitialProductDB(getProductName(product));
        return product && product.price ? product.price : initialProduct ? initialProduct.price : 0;
    }
    return product && product.price ? product.price : 0;
}

export async function getProductPriceFromQuantity(product: AllProductType, quantity: number, priceIsLock?: boolean): Promise<number> {
    const initialProduct = await getInitialProductDB(getProductName(product));
    if (initialProduct && initialProduct.price) {
        if (priceIsLock && quantity <= 0) return initialProduct.price;
        return initialProduct.price * quantity;
    }
    return 0;
}

export function getTotalPrice(products: AllProductType[]) {
    return products.reduce((total, cardProduct) => {
        return total + (cardProduct.price || 0);
    }, 0);
}

export function getProductQuantity(product: AllProductType, quantityIsLock?: boolean): number {
    if (product && 'quantity' in product && product && product.quantity !== null && product.quantity !== undefined) {
        if (!quantityIsLock && product.quantity <= 0) return 0;
        else if (quantityIsLock && product.quantity <= 0) return 1;
        return product.quantity;
    }
    return 1;
}

/** Sets the new quantity of the given quantity.
 * 
 * @param quantity - The quantity to set.
 * @param quantityAdd - The value to add.
 * @returns The new quantity.
 */
export function getNewQuantity(quantity: NullableType<number>, quantityAdd: NullableType<number>, quantityIsLock?: boolean): number {
    const min = quantityIsLock ? 1 : 0;
    const max = 9999;
    const v_quantity = quantity || 0;
    const v_quantityAdd = quantityAdd || 0;
    const som: number = v_quantity + v_quantityAdd;
    const result: number = som <= min ? min : som > max ? max : som;
    return result;
}

export function getProductIcon(item: MaybeProductType): ImageSourcePropType {
    const product = ValidProducts.find(p => p.name === (item as ProductType).name);
    return product && product.icon ? product.icon : pUnknown;
}

export function getProductIconStatus(item: MaybeProductType): ImageSourcePropType {
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

export function getProductValidIconStatus(product: ProductCardType): ImageSourcePropType {
    if (product.statusIcon === crossIcon) {
        return crossIcon;
    }
    return checkIcon;
}

/* OBJECT */

/** Creates a ProductType.
 * 
 * @param name - The name of the product.
 * @param price - The price of the product.
 * @returns The created ProductType.
 */
export function createProduct(name: string, price: number): ProductType {
    return { name, price };
}

/* BOOLEAN */

/** Checks if the given item has only the keys and types of a ProductType.
 * 
 * @param item - The item to check.
 * @returns True if the item has the keys and types of a ProductType, false otherwise.
 */
export function hasOnlyProductKeys(item: object): boolean {
    const itemKeys = Object.keys(item);
    const productKeys = ['name', 'price'];
    const hasOnlyProductKeys = itemKeys.every(key => productKeys.includes(key)) && itemKeys.length === productKeys.length;

    return hasOnlyProductKeys &&
        "name" in item && typeof (item as ProductType).name === 'string' &&
        "price" in item && typeof (item as ProductType).price === 'number';
}

/** Checks if the given item has the keys name and price of a ProductType.
 * 
 * @param item - The item to check.
 * @returns True if the item has the keys and types of a ProductType, false otherwise.
 */
export function hasProductKeys(item: object): boolean {
    const productKeys = ['name', 'price'];
    const itemKeys = Object.keys(item);

    return productKeys.every(key => itemKeys.includes(key)) &&
           typeof (item as ProductType).name === 'string' &&
           typeof (item as ProductType).price === 'number';
}

/** Determines if the given item is a ProductType.
 * 
 * @param item - The item to check.
 * @returns True if the item is a ProductType, false otherwise.
 */
export function isProduct(item: MaybeProductType): boolean {
    if (typeof item === 'string') {
        return parseProduct(item) !== null;
    }
    if (item && typeof item === 'object' && hasProductKeys(item)) {
        const { name, price } = item as ProductType;
        return typeof name === 'string' && typeof price === 'number';
    }
    return false;
}

/** Determines if the given item is a valid ProductType.
 * 
 * @param item - The item to check.
 * @returns True if the item is a valid ProductType, false otherwise.
 */
export function isValidProduct(item: MaybeProductType): boolean {
    return isProduct(item) && ValidProducts.some(p => p.name === (item as ProductType).name);
}

export function isValidProductSave(product: ProductExtendType): boolean {
    return typeof product.id === 'number' &&
    typeof product.name === 'string' && product.name !== 'Product unknown' &&
    typeof product.price === 'number' &&
    typeof product.quantity === 'number'
}

/** Checks if the given item is a ProductType and if its name matches the given name.
 * 
 * @param item - The item to check.
 * @param nameSearch - The name to compare with the item's name.
 * @returns True if the item is a ProductType and its name matches the given name, false otherwise.
 */
export function isNameProduct(item: MaybeProductType, nameSearch: string): boolean {
    if (item && isProduct(item)) {
        const product = item as ProductType;
        return product.name.toLowerCase() === nameSearch.toLowerCase();
    }
    return false;
}

export function isValidProductStatus(item: ProductCardType): boolean {
    return item.statusIcon === checkIcon || item.statusIcon === unknownIcon;
}

export function isValidProductToSave(item: ProductExtendType): boolean {
    if ("icon" in item && "statusIcon" in item) {
        const cardProduct = item as ProductCardType;
        return isValidProductSave(cardProduct) && isValidProductStatus(cardProduct);
    }
    return isValidProductSave(item);
}

/* STRING */

/** Parses a stringified item into a ProductType.
 * 
 * @param item - The item to parse.
 * @returns The parsed ProductType if successful, null otherwise.
 * @warning JSON.parse does not key without double quotes.
 * @warning JSON.parse does not accept commas at the end of an array or object.
 * @example JSON.parse('{"name": "Banane", "price": 199,}') returns null
 *                                                     ^
 */
export function parseProduct(item: MaybeProductType): NullableType<ProductType> {
    if (item && typeof item === 'string') {
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

/** Parses a ProductType into a string.
 * 
 * @param item - The item to parse.
 * @returns The parsed string if successful, null otherwise.
 */
export function parseProductOrStringify(item: MaybeProductType): ProductType | string {
    return parseProduct(item) || stringifyProduct(item);
}

/** Retrieves a ProductType from the given item.
 * 
 * @param item - The item to retrieve the ProductType from.
 * @returns The ProductType if the item is valid, null otherwise.
 */
export function stringifyProduct(product: MaybeProductType): string {
    return JSON.stringify(product).trim();
}

export function parsePrice(price: NullableType<number>, symbole: string): string {
    if (price) {
        if (price.toString().length === 1) return '0.0' + price + symbole;
        if (price.toString().length === 2) return '0.' + price + symbole;
        const priceBeforeCommat = price.toString().slice(0, -2);
        const priceAfterCommat = price.toString().slice(-2);
        return priceBeforeCommat + '.' + priceAfterCommat + symbole;
    }
    return '0.00' + symbole;
}

export function parseQuantity(quantity: NullableType<number>, valueAdd: NullableType<number | string>, quantityIsLock?: boolean): string {
    const v_quantity = quantity || 0;
    const v_valueAdd = valueAdd || 0;
    if (typeof v_valueAdd === 'number') {
        return getNewQuantity(v_quantity, v_valueAdd, quantityIsLock).toString();
    }
    if (v_valueAdd.length === 0 || isNaN(parseInt(v_valueAdd))) {
        return '0';
    }
    return getNewQuantity(0, parseInt(v_valueAdd), quantityIsLock).toString();
}