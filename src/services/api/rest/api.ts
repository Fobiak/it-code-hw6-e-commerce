import makeRequest, { Request } from '../httpClient';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string;
}

interface Category {
    id: number;
    name: string;
}

export async function getProducts(): Promise<Product[]> {
    const request: Request = {
        method: 'get',
        url: `${BASE_URL}/products`
    };
    const response = await makeRequest(request);
    return response.data;
}

export async function getProduct(id: number): Promise<Product> {
    const request: Request = {
        method: 'get',
        url: `${BASE_URL}/products/${id}`
    };
    const response = await makeRequest(request);
    return response.data;
}

export async function searchProducts(title: string | string[]): Promise<Product[]> {
    const request: Request = {
        method: 'get',
        url: `${BASE_URL}/products/?title=${title}`
    };
    const response = await makeRequest(request);
    return response.data;
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
    const request: Request = {
        method: 'get',
        url: `${BASE_URL}/products/?categoryId=${categoryId}`
    };
    const response = await makeRequest(request);
    return response.data;
}

export async function getCategories(): Promise<Category[]> {
    const request: Request = {
        method: 'get',
        url: `${BASE_URL}/categories`
    };
    const response = await makeRequest(request);
    return response.data;
}
