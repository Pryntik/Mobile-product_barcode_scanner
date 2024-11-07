export type SelectType<T> = {
    rows: {
        length: number,
        item(index: number): T,
    }
}