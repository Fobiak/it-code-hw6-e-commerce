<template>
    <div>
        <h1>Результаты поиска: "{{ route.params.title }}"</h1>
        <ul>
            <li v-for="item in state.items" :key="item.id">
                <router-link :to="{ name: 'detail', params: { id: item.id } }">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, defineExpose } from 'vue'
import { useRoute } from 'vue-router'
import { searchProducts } from '../api'
import 'element-plus/dist/index.css'

interface Item {
    id: number
    title: string
    description: string
}

const state = reactive({
    items: [] as Item[],
})

const route = useRoute()

onMounted(async () => {
    const title = route.params.title
    state.items = await searchProducts(title)
})

defineExpose({
    state,
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
