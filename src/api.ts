import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

interface Product {
    id: number;
    title: string;
    description: string;
}

interface Category {
    id: number;
    name: string;
}

export async function getProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${BASE_URL}/products`);
    return response.data;
}

export async function getProduct(id: number): Promise<Product> {
    const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
    return response.data;
}

export async function searchProducts(title: string | string[]): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${BASE_URL}/products/?title=${title}`);
    return response.data;
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${BASE_URL}/products/?categoryId=${categoryId}`);
    return response.data;
}

export async function getCategories(): Promise<Category[]> {
    const response = await axios.get<Category[]>(`${BASE_URL}/categories`);
    return response.data;
}