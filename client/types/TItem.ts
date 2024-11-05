export type MaybeProductType = ProductType | string | object | null | undefined;

export type ProductType = {
    name: string,
    price: number,
    id: number,
}

export const objectBanane: ProductType = {
    "name": "Banane",
    "price": 199,
    "id": 1
}

export const stringBanane = JSON.stringify(objectBanane);