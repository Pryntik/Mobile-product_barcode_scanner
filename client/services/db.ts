import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';
import { SelectType } from '../types/TSQL';
import { ProductSaveType } from '../types/TItem';

const panier_db = openDatabaseSync('Basket.db');

// Fonction pour créer les tables du panier si elle n'existe pas
export const createTables = (): Promise<void> => {
    const ProductsQuery = `
        DROP TABLE IF EXISTS Products;
        CREATE TABLE IF NOT EXISTS Products (
            name TEXT,
            price INTEGER,
            quantity INTEGER,
            id INTEGER DEFAULT 1,
            PRIMARY KEY(id)
        )`;
    return new Promise((resolve, reject) => {
        try {
            panier_db.execSync(ProductsQuery);
            resolve();
        } catch (error) {
            console.error(error);
            reject(new Error('Failed to create tables'));
        }
    });
};

// Obtenir un produit du panier
export const getProductDB = (id: number): Promise<ProductSaveType | null> => {
    return new Promise((resolve, reject) => {
        try {
            const select = panier_db.getFirstSync('SELECT * FROM Products WHERE id = ?;', id) as SelectType<ProductSaveType>;
            if (!select || !select.rows) {
                throw new Error(`getProductDB: Query returned null for id ${id}`);
            }

            const item = select.rows.length > 0 ? select.rows.item(0) : null;
            resolve(item);
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            reject(error);
        }
    });
};

// Obtenir tous les produits du panier
export const getAllProductsDB = (): Promise<ProductSaveType[]> => {
    return new Promise((resolve, reject) => {
        try {
            const select = panier_db.getFirstSync('SELECT * FROM Products') as SelectType<ProductSaveType>;
            if (select && select.rows) {
                const items: ProductSaveType[] = [];
                for (let i = 0; i < select.rows.length; i++) {
                    items.push(select.rows.item(i));
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
    return new Promise((resolve, reject) => {
        try {
            const { id, name, price, quantity } = newProduct;
            panier_db.runSync('BEGIN TRANSACTION;');
            const select = panier_db.getFirstSync('SELECT * FROM Products WHERE id = ?;', id) as SelectType<ProductSaveType>;

            if (select && select.rows) {
                const product = select.rows.length > 0 ? select.rows.item(0) : null;
                if (product) {
                    const newQuantity = product.quantity + quantity;
                    panier_db.runSync('UPDATE Products SET quantity = ? WHERE id = ?;', newQuantity, id);
                }
                else {
                    panier_db.runSync('INSERT INTO Products (id, name, price, quantity) VALUES (?, ?, ?, ?);',
                        id, name, price, quantity
                    );
                }
            }
            else {
                panier_db.runSync('INSERT INTO Products (id, name, price, quantity) VALUES (?, ?, ?, ?);',
                    id, name, price, quantity
                );
            }
            panier_db.runSync('COMMIT;');
            resolve();
        } catch (error) {
            console.error('Error adding product:', error);
            panier_db.runSync('ROLLBACK;');
            reject(error);
        }
    });
};

// Suppression d'un produit du panier
export const deleteProductDB = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            panier_db.runSync('DELETE FROM Products WHERE id = ?;', id);
            resolve();
        } catch (error) {
            console.error(`Error deleting product with id ${id}:`, error);
            reject(error);
        }
    });
};

// Suppression de tous les produits du panier
export const deleteAllProductsDB = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            panier_db.runSync('DELETE FROM Products;');
            resolve();
        } catch (error) {
            console.error('Error deleting all products:', error);
            reject(error);
        }
    });
};