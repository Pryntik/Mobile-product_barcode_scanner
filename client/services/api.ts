import { ReponseType } from '../types/TAPI';
import { ProductSaveType, ProductType } from '../types/TItem';

const apiUrl = `http://${process.env.API_IP}:8000`;

export const getAllProductsAPI = async (): Promise<ReponseType<ProductSaveType[]>> => {
    console.log('getAllProducts 1');
    try {
        console.log('getAllProducts 2');
        const response = await fetch(`${apiUrl}/items/`);
        console.log('getAllProducts 3');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        console.log('getAllProducts 4');
        const json: ReponseType<ProductSaveType[]> = await response.json();
        console.log('getAllProducts 5');
        return json;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

export const getProductsAPI = async (offset = 0, limit = 100): Promise<ReponseType<ProductSaveType[]>> => {
    try {
        const response = await fetch(`${apiUrl}/items/?offset=${offset}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json: ReponseType<ProductSaveType[]> = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

export const getProductAPI = async (productId: number): Promise<ReponseType<ProductSaveType>> => {
    try {
        const response = await fetch(`${apiUrl}/items/${productId}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json: ReponseType<ProductSaveType> = await response.json();
        return json;
    } catch (error) {
        console.error(`Error fetching item with id ${productId}:`, error);
        throw error;
    }
}

export async function postProduct(product: ProductType): Promise<ReponseType<ProductSaveType>> {    
    try {
        console.log('postProduct 1');
        const response = await fetch(`${apiUrl}/items/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        console.log('postProduct 2');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        console.log('postProduct 3');
        const json: ReponseType<ProductSaveType> = await response.json();
        console.log('json', json);
        return json;
    } catch (error) {
        console.error('Error postProduct', error);
        throw error;
    }
}

export const deleteProductAPI = async (productId: number): Promise<ReponseType<ProductSaveType>> => {
    try {
        const response = await fetch(`${apiUrl}/items/?item_id=${productId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json: ReponseType<ProductSaveType> = await response.json();
        return json;
    } catch (error) {
        console.error(`Error deleting item with id ${productId}:`, error);
        throw error;
    }
}

export const deleteAllProductsAPI = async (): Promise<ReponseType<ProductSaveType[]> | undefined> => {
    try {
        const products = await getAllProductsAPI();
        if (!products || products.data.length === 0) {
            console.log('No items to delete');
            return;
        }

        for (const product of products.data) {
            await deleteProductAPI(product.id);
            console.log(`Deleted item with id ${product.id}`);
        }

        console.log('All items deleted successfully');
    } catch (error) {
        console.error('Error deleting all items:', error);
        throw error;
    }
};