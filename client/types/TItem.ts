import unknownIcon from "../assets/img/unknown.png";
import crossIcon from "../assets/img/cross.png";
import pBanana from "../assets/product/p_banana.png";
import pApple from "../assets/product/p_apple.png";
import pUnknown from "../assets/product/p_unknown.png";
import { ImageSourcePropType } from "react-native";

// Type

export type NullableType<T> = T | null;

export type UndefinebaleType<T> = T | undefined;

export type MaybeType<T> = T | null | undefined;

export type MaybeProductType = MaybeType<AllProductType> | string | object;

// Product type

export type ProductExtendType = ProductSaveType | ProductCardType;

export type AllProductType = ProductType | ProductSaveType | ProductCardType;

export type ProductStatusType = 'valid' | 'unknown' | 'error';

export type ProductType = {
    name: string,
    price: number
};

export type ProductSaveType = {
    id: number,
    name: string,
    price: number,
    quantity: number,
};

export type ProductCardType = {
    id: NullableType<number>,
    name: NullableType<string>,
    price: NullableType<number>,
    quantity: NullableType<number>,
    icon: ImageSourcePropType,
    statusIcon: ImageSourcePropType,
};

export type ProductChangerQuantityType = {
    quantity: number,
    id?: MaybeType<number>,
};

export type ProductIconType = {
    name: string,
    icon: ImageSourcePropType,
};

// Item type

export type ItemCheckoutType = {
    id: number,
    amount: number,
}

export type CustomerType = {
    id: string;
    email: string;
};

export type ItemType = {
    id: number;
    name: string;
    price: number;
};

export type ItemPurchaseType = {
    item: ItemType;
    amount: number;
};

export type PaymentType = {
    id: string;
    is_checked: boolean;
    checkout_date: NullableType<string>;
    customer: CustomerType;
    purchased_items: ItemPurchaseType[];
};

// Product Card

export const ProductCardDefault: ProductCardType = {
    id: null,
    name: 'Product default',
    price: 0,
    quantity: 1,
    icon: pUnknown,
    statusIcon: unknownIcon,
};

export const ProductCardUnknown: ProductCardType = {
    id: null,
    name: 'Product unknown',
    price: 0,
    quantity: 1,
    icon: pUnknown,
    statusIcon: crossIcon,
};

// Product

export const pBanane: ProductType = {
    "name": "Banane",
    "price": 199
};

export const pPomme: ProductType = {
    "name": "Pomme",
    "price": 299
};

// Product Icon

export const iBanane: ProductIconType = {
    name: "Banane",
    icon: pBanana,
};

export const iPomme: ProductIconType = {
    name: "Pomme",
    icon: pApple,
};

export const ValidProducts: ProductIconType[] = [
    iBanane,
    iPomme,
];

// Payment

export const PaymentDefault: PaymentType = {
    id: '',
    is_checked: false,
    checkout_date: null,
    customer: {
        id: '',
        email: '',
    },
    purchased_items: [],
};