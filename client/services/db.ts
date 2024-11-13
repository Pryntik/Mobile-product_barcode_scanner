import { openDatabaseSync } from 'expo-sqlite';
import { SelectType } from '../types/TSQL';
import { Nullable, ProductSaveType } from '../types/TItem';

const panier_db = openDatabaseSync('Basket.db');

// Fonction pour créer les tables du panier si elle n'existe pas
export const createTables = (): Promise<void> => {
    const ProductsQuery = `
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL
        );`;
    return new Promise(async (resolve, reject) => {
        try {
            panier_db.execAsync(ProductsQuery);
            resolve();
        } catch (error) {
            console.error(error);
            reject(new Error('Failed to create tables'));
        }
    });
};

// Obtenir un produit du panier
export const getProductDB = (id: number): Promise<Nullable<ProductSaveType>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const select = await panier_db.getFirstAsync('SELECT * FROM Products WHERE id = ?;', id) as SelectType<ProductSaveType>;
            if (!select) {
                throw new Error(`getProductDB: Query returned null for id ${id}`);
            }
            resolve(select);
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            await panier_db.runAsync('ROLLBACK;');
            reject(error);
        }
    });
};

// Obtenir tous les produits du panier
export const getAllProductsDB = (): Promise<ProductSaveType[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const select = await panier_db.getAllAsync('SELECT * FROM Products') as SelectType<ProductSaveType[]>;
            if (select) {
                const items: ProductSaveType[] = [];
                for (let i = 0; i < select.length; i++) {
                    items.push(select[i]);
                }
                resolve(items);                
            }
            else {
                resolve([]);
            }
        } catch (error) {
            console.error('Error fetching all products:', error);
            reject(error);
        }
    });
};

// Insertion d'un produit dans le panier
export const addProductDB = (newProduct: ProductSaveType): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            await panier_db.runAsync('BEGIN TRANSACTION;');
            const { id, name, price, quantity } = newProduct;
            const select = await panier_db.getFirstAsync('SELECT * FROM Products WHERE id = ?;', id) as SelectType<ProductSaveType>;

            if (select) {
                const newQuantity = select.quantity + quantity;
                await panier_db.runAsync('UPDATE Products SET quantity = ? WHERE id = ?;', newQuantity, id);
            }
            else {
                await panier_db.runAsync('INSERT INTO Products (id, name, price, quantity) VALUES (?, ?, ?, ?);',
                    id, name, price, quantity
                );
            }

            await panier_db.runAsync('COMMIT;');
            resolve();
        } catch (error) {
            console.error('Error adding product:', error);
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
            console.error(`Error deleting product with id ${id}:`, error);
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
            console.error('Error deleting all products:', error);
            await panier_db.runAsync('ROLLBACK;');
            reject(error);
        }
    });
};