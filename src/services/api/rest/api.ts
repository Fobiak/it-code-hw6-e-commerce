import makeRequest from '../httpClient';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = () =>
    makeRequest( {
        method: 'get',
        url: `${BASE_URL}/products`
    })

export const fetchProduct = (id: number) =>
    makeRequest( {
        method: 'get',
        url: `${BASE_URL}/products/${id}`
    })

export const fetchSearchProducts = (title: string | string[]) =>
    makeRequest( {
        method: 'get',
        url: `${BASE_URL}/products/?title=${title}`
    })

export const fetchGetProductsByCategory = (categoryId: number) =>
    makeRequest( {
    method: 'get',
    url: `${BASE_URL}/products/?categoryId=${categoryId}`
})

export const fetchGetCategories = () =>
    makeRequest( {
        method: 'get',
        url: `${BASE_URL}/categories`
})
