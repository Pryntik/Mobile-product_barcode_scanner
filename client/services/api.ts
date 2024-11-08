import { ToastAndroid } from 'react-native';
import { ReponseType } from '../types/TAPI';
import { ProductSaveType, ProductType } from '../types/TItem';

const apiUrl = `http://${process.env.API_IP}:8000`;

export const getAllProductsAPI = async (): Promise<ReponseType<ProductSaveType[]>> => {
    try {
        const response = await fetch(`${apiUrl}/items/`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json: ReponseType<ProductSaveType[]> = await response.json();
        ToastAndroid.show(`Items fetched: ${json.data.length}`, ToastAndroid.SHORT);
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
        const response = await fetch(`${apiUrl}/items/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json: ReponseType<ProductSaveType> = await response.json();
        ToastAndroid.show('Product added successfully', ToastAndroid.SHORT);
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
            ToastAndroid.show('No items to delete', ToastAndroid.SHORT);
            return;
        }

        for (const product of products.data) {
            await deleteProductAPI(product.id);
            ToastAndroid.show(`Deleted item with id ${product.id}`, ToastAndroid.SHORT);
        }

        ToastAndroid.show('All items deleted successfully', ToastAndroid.SHORT);
    } catch (error) {
        console.error('Error deleting all items:', error);
        throw error;
    }
};