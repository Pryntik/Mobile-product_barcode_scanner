import { openDatabaseSync } from 'expo-sqlite';
import { SelectType } from '../types/TSQL';
import { MaybeType, NullableType, ProductSaveType, ProductType } from '../types/TItem';

const panier_db = openDatabaseSync('Basket.db');

// Fonction pour créer les tables du panier si elle n'existe pas
export const createTables = (): Promise<void> => {
    const ProductsQuery = `
        CREATE TABLE IF NOT EXISTS Products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS InitialProducts (
            name TEXT PRIMARY KEY,
            price REAL NOT NULL
        );`;
    return new Promise(async (resolve, reject) => {
        try {
            panier_db.execAsync(ProductsQuery);
            resolve();
        } catch (error) {
            console.error(`Error createTables`, error);
            reject(new Error('Failed to create tables'));
        }
    });
};

async function getProductIdByName(name: string): Promise<MaybeType<number>> {
    const products = await getAllProductsDB();
    return products.find(p => p.name === name)?.id;
}

async function getInitialProductByName(name: string): Promise<MaybeType<ProductType>> {
    const products = await getAllInitialProductsDB();
    return products.find(p => p.name === name);
}

function hasValidProductKeysTypes(product: ProductSaveType): boolean {
    return typeof product.id === 'number' &&
    typeof product.name === 'string' && product.name !== 'Product unknown' &&
    typeof product.price === 'number' &&
    typeof product.quantity === 'number'
}

// Obtenir un produit du panier
export const getProductDB = (id: number): Promise<NullableType<ProductSaveType>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await panier_db.getFirstAsync('SELECT * FROM Products WHERE id = ?;', id) as SelectType<ProductSaveType>;
            if (product) {
                resolve(product);
            }
        } catch (error) {
            console.error(`Error getProductDB [id=${id}]`, error);
            reject(error);
        }
    });
};

// Obtenir un produit initial
export const getInitialProductDB = (name: string): Promise<NullableType<ProductType>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const initialProduct = await panier_db.getFirstAsync('SELECT * FROM InitialProducts WHERE name = ?;', name) as SelectType<ProductType>;
            if (initialProduct) {
                resolve(initialProduct);
            }
        } catch (error) {
            console.error(`Error getInitialProductDB [name=${name}]`, error);
            reject(error);
        }
    });
};

// Obtenir tous les produits du panier
export const getAllProductsDB = (): Promise<ProductSaveType[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await panier_db.getAllAsync('SELECT * FROM Products') as SelectType<ProductSaveType[]>;
            if (products) {
                const items: ProductSaveType[] = [];
                for (let i = 0; i < products.length; i++) {
                    items.push(products[i]);
                }
                resolve(items);                
            }
            else {
                resolve([]);
            }
        } catch (error) {
            console.error('Error getAllProductsDB', error);
            reject(error);
        }
    });
};

// Obtenir tous les produits initiaux
export const getAllInitialProductsDB = (): Promise<ProductSaveType[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await panier_db.getAllAsync('SELECT * FROM InitialProducts') as SelectType<ProductSaveType[]>;
            if (products) {
                const items: ProductSaveType[] = [];
                for (let i = 0; i < products.length; i++) {
                    items.push(products[i]);
                }
                resolve(items);                
            }
            else {
                resolve([]);
            }
        } catch (error) {
            console.error('Error getAllInitialProductsDB', error);
            reject(error);
        }
    });
};

// Insertion d'un produit dans le panier
export const addProductDB = (newProduct: ProductSaveType): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id, name, price, quantity } = newProduct;
            const searchId = await getProductIdByName(name);
            const validId = searchId || id;
            await panier_db.runAsync('BEGIN TRANSACTION;');
            const product = await panier_db.getFirstAsync('SELECT * FROM Products WHERE id = ?;', validId) as SelectType<ProductSaveType>;
            const initialProduct = await panier_db.getFirstAsync('SELECT * FROM InitialProducts WHERE name = ?;', name) as SelectType<ProductType>;

            if (product && initialProduct) {
                const newQuantity = product.quantity + quantity;
                const newPrice = initialProduct.price * newQuantity;
                await panier_db.runAsync('UPDATE Products SET quantity = ?, price = ? WHERE id = ?;', newQuantity, newPrice, validId);
                await panier_db.runAsync('COMMIT;');
                resolve();
            }
            else if (hasValidProductKeysTypes({id: validId, name, price, quantity})) {
                await panier_db.runAsync('INSERT INTO Products (id, name, price, quantity) VALUES (?, ?, ?, ?);', validId, name, price, quantity);
                if (!initialProduct) await addInitialProductDB({name, price}, true);
                await panier_db.runAsync('COMMIT;');
                resolve();
            }
            else {
                await panier_db.runAsync('ROLLBACK;');
                reject(new Error('Invalid product'));
            }
        } catch (error) {
            console.error('Error addProductDB', error);
            await panier_db.runAsync('ROLLBACK;');
            reject(error);
        }
    });
};

// Insertion d'un produit initial
export const addInitialProductDB = (product: ProductType, transactionIsActive?: boolean): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, price } = product;
            const initialProduct = await getInitialProductByName(name);
            if (!initialProduct && typeof name === 'string' && typeof price === 'number') {
                if (!transactionIsActive) await panier_db.runAsync('BEGIN TRANSACTION;');
                await panier_db.runAsync('INSERT INTO InitialProducts (name, price) VALUES (?, ?);', name, price);
                if (!transactionIsActive) await panier_db.runAsync('COMMIT;');
                resolve();
            }
            else {
                reject(new Error('Invalid initial product'));
            }
        } catch (error) {
            console.error('Error addInitialProductDB', error);
            !transactionIsActive && await panier_db.runAsync('ROLLBACK;');
            reject(error);
        }
    });
}

export const updateProductDB = (updateProduct: ProductSaveType): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id, name, quantity } = updateProduct;
            const searchId = await getProductIdByName(name);
            const validId = searchId || id;
            await panier_db.runAsync('BEGIN TRANSACTION;');
            const product = await panier_db.getFirstAsync('SELECT * FROM Products WHERE id = ?;', validId) as SelectType<ProductSaveType>;
            const initialProduct = await panier_db.getFirstAsync('SELECT * FROM InitialProducts WHERE name = ?;', name) as SelectType<ProductType>;

            if (product && initialProduct) {
                const newPrice = initialProduct.price * quantity;
                await panier_db.runAsync('UPDATE Products SET price = ?, quantity = ? WHERE id = ?;', newPrice, quantity, validId);
                await panier_db.runAsync('COMMIT;');
                resolve();
            }
            else {
                await panier_db.runAsync('ROLLBACK;');
                reject(new Error('Invalid product'));
            }
        } catch (error) {
            console.error('Error updateProductDB', error);
            await panier_db.runAsync('ROLLBACK;');
            reject(error);
        }
    });
};

// Suppression d'un produit du panier
export const deleteProductDB = (id: number): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await panier_db.runAsync('BEGIN TRANSACTION;');
            await panier_db.runAsync('DELETE FROM Products WHERE id = ?;', id);
            await panier_db.runAsync('COMMIT;');
            resolve();
        } catch (error) {
            console.error(`Error deleteProductDB [id=${id}]`, error);
            await panier_db.runAsync('ROLLBACK;');
            reject(error);
        }
    });
};

// Suppression d'un produit initial
export const deleteInitialProductDB = (name: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await panier_db.runAsync('BEGIN TRANSACTION;');
            await panier_db.runAsync('DELETE FROM InitialProducts WHERE name = ?;', name);
            await panier_db.runAsync('COMMIT;');
            resolve();
        } catch (error) {
            console.error(`Error deleteInitialProductDB [name=${name}]`, error);
            await panier_db.runAsync('ROLLBACK;');
            reject(error);
        }
    });
};

// Suppression de tous les produits du panier
export const deleteAllProductsDB = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await panier_db.runAsync('BEGIN TRANSACTION;');
            await panier_db.runAsync('DELETE FROM Products;');
            await panier_db.runAsync('COMMIT;');
            resolve();
        } catch (error) {
            console.error('Error deleteAllProductsDB', error);
            await panier_db.runAsync('ROLLBACK;');
            reject(error);
        }
    });
};

// Suppression de tous les produits initiaux
export const deleteAllInitialProductsDB = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await panier_db.runAsync('BEGIN TRANSACTION;');
            await panier_db.runAsync('DELETE FROM InitialProducts;');
            await panier_db.runAsync('COMMIT;');
            resolve();
        } catch (error) {
            console.error('Error deleteAllInitialProductsDB', error);
            await panier_db.runAsync('ROLLBACK;');
            reject(error);
        }
    });
};