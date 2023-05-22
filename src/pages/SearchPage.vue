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

const search = async () => {
    await store.search()
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

const debouncedSearch = useDebounce(search, 300)

onMounted(debouncedSearch)

watch(() => route.params.query, (query) => {
    if (typeof query === "string") {
        store.searchQuery = query;
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
    padding: 0;
}

li {
    margin-bottom: 8px;
}

router-link {
    color: #2196f3;
    text-decoration: none;
}

router-link:hover {
    text-decoration: underline;
}
</style>
