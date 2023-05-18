<template>
    <div>
        <h1>Результаты поиска: "{{ searchQuery }}"</h1>
        <ul>
            <li v-for="item in state.items" :key="item.id">
                <router-link :to="{ name: 'detail', params: { id: item.id } }">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, defineExpose } from 'vue'
import { useRoute } from 'vue-router'
import { searchProducts } from '../api'

interface Item {
    id: number
    title: string
    description: string
}

const state = reactive({
    items: [] as Item[]
})

const route = useRoute()

let searchQuery = route.params.title || ''
const search = async () => {
    state.items = await searchProducts(searchQuery)
}

onMounted(search)

watch(() => route.params.title, () => {
    searchQuery = route.params.title || ''
    search()
})

defineExpose({
    state,
    searchQuery
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
