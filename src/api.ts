const BASE_URL = 'https://fakestoreapi.com'

interface Product {
    id: number
    title: string
    description: string
}

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products`)
    const products = await response.json()
    return products
}

export async function getProduct(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    const product = await response.json()
    return product
}