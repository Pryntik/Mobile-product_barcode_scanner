import { ImageSourcePropType } from "react-native";

// Type
export type MaybeProductType = ProductType | string | object | null | undefined;

export type ProductStatusType = 'check' | 'unknown' | 'error';

export type ProductType = {
    name: string,
    price: number,
    id: number,
}

export type ProductIconType = {
    name: string,
    icon: ImageSourcePropType,
}

export type ProductCardType = {
    icon: ImageSourcePropType,
    name: string,
    price: string,
    statusIcon: ImageSourcePropType,
}


export const validProducts: ProductIconType[] = [{
    name: "Banane",
    icon: require("../assets/product/p_banana.png"),
}]

// Example
export const pBanane: ProductType = {
    "name": "Banane",
    "price": 1.99,
    "id": 1
}

export const pPomme: ProductType = {
    "name": "Pomme",
    "price": 2.99,
    "id": 1
}