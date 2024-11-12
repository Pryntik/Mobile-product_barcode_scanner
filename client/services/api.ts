import { ReponseType } from '../types/TAPI';
import { ProductSaveType, ProductType } from '../types/TItem';
import { toast } from '../utils/log.util';

export const apiUrl = `http://${process.env.API_IP}:${process.env.API_PORT}`;
export const userId = `${process.env.USER_ID}`;

export async function getAllProductsAPI(): Promise<ReponseType<ProductSaveType[]>> {
    try {
        const response = await fetch(`${apiUrl}/items/`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json: ReponseType<ProductSaveType[]> = await response.json();
        toast(`Items fetched: ${json.data.length}`);
        return json;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
}

export async function getProductsAPI(offset = 0, limit = 100): Promise<ReponseType<ProductSaveType[]>> {
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

export async function getProductAPI(productId: number): Promise<ReponseType<ProductSaveType>> {
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
        toast('Product added successfully');
        return json;
    } catch (error) {
        console.error('Error postProduct', error);
        throw error;
    }
}

export async function deleteProductAPI(productId: number): Promise<ReponseType<ProductSaveType>> {
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

export async function deleteAllProductsAPI(): Promise<ReponseType<ProductSaveType[]> | undefined> {
    try {
        const products = await getAllProductsAPI();
        if (!products || products.data.length === 0) {
            toast('No items to delete');
            return;
        }

        for (const product of products.data) {
            await deleteProductAPI(product.id);
            toast(`Deleted item with id ${product.id}`);
        }

        toast('All items deleted successfully');
    } catch (error) {
        console.error('Error deleting all items:', error);
        throw error;
    }
};