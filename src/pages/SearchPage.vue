<template>
    <div>
        <h1>Результаты поиска: "{{ store.searchQuery }}"</h1>
        <ul>
            <li v-for="item in store.items" :key="item.id">
                <router-link :to="{ name: 'detail', params: { id: item.id } }">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>
</template>


<script setup lang="ts">
import { onMounted, watch, defineExpose } from 'vue'
import { useRoute } from 'vue-router'
import { useECommerceStore } from '../store/e-commerce-store'

const store = useECommerceStore()
const route = useRoute()

const searchProduct = async () => {
    await store.fetchSearchProducts(store.searchQuery)
}

const useDebounce = (fn: Function, delay: number) => {
    let timeoutId: number | null = null
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const debouncedSearch = useDebounce(searchProduct, 300)

onMounted(debouncedSearch)

watch(() => route.params.title, (title) => {
    if (typeof title === "string") {
        store.searchQuery = title;
        debouncedSearch();
    }
})

defineExpose({
    store,
    searchQuery: store.searchQuery
})
</script>


<style lang="scss" scoped>
h1 {
    font-size: 24px;
    margin-bottom: 16px;
}

ul {
    list-style-type: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

li {
    margin-bottom: 8px;
    border: 2px solid #ccc;
    border-radius: 10px;
    font-family: "monospace";
    font-size: 18px;
    text-indent: 10px;
}

router-link {
    display: inline-block;
    padding: 16px;
    background-color: #f5f5f5;
    color: #333;
    text-decoration: none;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    transition: background-color 0.3s, box-shadow 0.3s;
}

router-link:hover {
    background-color: #eee;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
}
</style>
