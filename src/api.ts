import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

interface Product {
    id: number;
    title: string;
    description: string;
}

export async function getProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${BASE_URL}/products`);
    return response.data;
}

export async function getProduct(id: number): Promise<Product> {
    const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
    return response.data;
}