import crossIcon from "../assets/img/cross.png";
import pUnknown from "../assets/product/p_unknown.png";
import { ImageSourcePropType } from "react-native";

// Type
export type Nullable<T> = T | null;

export type Undefinebale<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export type MaybeProductType = Maybe<AllProductType> | string | object;

export type ProductExtendType = ProductSaveType | ProductCardType;

export type AllProductType = ProductType | ProductSaveType | ProductCardType;

export type ProductStatusType = 'valid' | 'unknown' | 'error';

export type ProductType = {
    name: string,
    price: number
}

export type ProductSaveType = {
    id: number,
    name: string,
    price: number,
    quantity: number,
}

export type ProductCardType = {
    id: Nullable<number>,
    name: Nullable<string>,
    price: Nullable<number>,
    quantity: Nullable<number>,
    icon: ImageSourcePropType,
    statusIcon: ImageSourcePropType,
}

export const productCardDefault: ProductCardType = {
    id: null,
    name: 'Product unknown',
    price: 0,
    quantity: 1,
    icon: pUnknown,
    statusIcon: crossIcon,
}

export type ProductIconType = {
    name: string,
    icon: ImageSourcePropType,
}

export const validProducts: ProductIconType[] = [{
    name: "Banane",
    icon: require("../assets/product/p_banana.png"),
}]

// Example
export const pBanane: ProductType = {
    "name": "Banane",
    "price": 199
}

export const pPomme: ProductType = {
    "name": "Pomme",
    "price": 299
}