import { defineStore } from 'pinia';
import { api } from '../services/api';
import {Category} from "../types/category";
import { Item } from '../types/Item'
import { useRouter } from 'vue-router';
const $router = useRouter();

export const useECommerceStore = defineStore('e-commerce', {
    state: () => ({
        searchQuery: '',
        selectedCategory: '',
        showFilter: false,
        categories: [] as Category[],
        items: [] as Item[],
        item: {} as Item
    }),

    actions: {
        toggleFilter() {
            this.showFilter = !this.showFilter;
        },

        async search() {
            if (this.searchQuery) {
                await $router.push(`/search/${this.searchQuery}`);
            }
        },

        async filterByCategory() {
            if (this.selectedCategory) {
                await $router.push(`/category/${this.selectedCategory}`);
            }
        },

        async fetchCategories() {
            const response = await api.fetchGetCategories();
            this.categories = response.data;
        },
        async fetchProductsByCategory(categoryId: number) {
            const response = await api.fetchGetProductsByCategory(categoryId)
            this.items = response.data
        },
        async fetchProduct(id: number) {
            const response = await api.fetchProduct(id);
            this.item = response.data;
        },

        async loadItems() {
            const response = await api.fetchProducts();
            this.items.push(...response.data);
        },
    },
});
