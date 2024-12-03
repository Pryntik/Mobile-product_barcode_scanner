import { ReponseType } from '../types/TAPI';
import { PaymentType, ProductSaveType, ProductType } from '../types/TItem';
import { API_IP, API_PORT } from '@env';

const apiUrl = `http://${API_IP}:${API_PORT}`;

export async function getAllProductsAPI(): Promise<ReponseType<ProductSaveType[]>> {
    try {
        const response = await fetch(`${apiUrl}/items/`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json: ReponseType<ProductSaveType[]> = await response.json();
        return json;
    } catch (error) {
        console.error('Error getAllProductsAPI', error);
        throw error;
    }
}

export async function getProductsAPI(): Promise<ReponseType<ProductSaveType[]>> {
    try {
        const response = await fetch(`${apiUrl}/items/`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json: ReponseType<ProductSaveType[]> = await response.json();
        return json;
    } catch (error) {
        console.error('Error getProductsAPI', error);
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
        console.error(`Error getProductAPI [id=${productId}]:`, error);
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
        console.error(`Error deleteProductAPI [id=${productId}]:`, error);
        throw error;
    }
}

export async function deleteAllProductsAPI(): Promise<ReponseType<ProductSaveType[]> | undefined> {
    try {
        const products = await getAllProductsAPI();
        if (!products || products.data.length === 0) {
            return;
        }

        for (const product of products.data) {
            await deleteProductAPI(product.id);
        }
    } catch (error) {
        console.error('Error deleteAllProductsAPI', error);
        throw error;
    }
};

export async function getAllPaymentsAPI(): Promise<ReponseType<PaymentType[]>> {
    const url = `${apiUrl}/payments/all`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json: ReponseType<PaymentType[]> = await response.json();
        return json;
    } catch (error) {
        console.error('Error getAllPaymentsAPI', error);
        throw error;
    }
}