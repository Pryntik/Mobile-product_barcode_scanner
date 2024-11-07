export type ReponseType<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
}