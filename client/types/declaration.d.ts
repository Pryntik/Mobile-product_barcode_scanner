declare module "*.png"
declare module '@env' {
    export const API_IP: string;
    export const API_PORT: string;
    export const USER_ID: string;
    export const STRIPE_SK: string;
    export const STRIPE_PK: string;
}