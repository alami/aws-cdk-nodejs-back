import dbmock from './dbmock.json'

export const productsTableName = 'rs-aws-products'
export const stocksTableName = 'rs-aws-stocks'

export type Product = {
    id: string
    title: string
    description: string
    price: number
}

export type Stock = {
    product_id: string
    count: number
}

export const getProducts = async () => dbmock

export const getProductById = async (id: string) =>
    dbmock.find((product) => product.id === id)