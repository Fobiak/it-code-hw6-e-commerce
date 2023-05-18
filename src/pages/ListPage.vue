<template>
    <div>
        <ul>
            <li v-for="item in state.items" :key="item.id">
                <router-link :to="{ name: 'detail', params: { id: item.id } }">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, defineExpose } from 'vue'
import { getProducts } from '../api'
import 'element-plus/dist/index.css'

interface Item {
    id: number
    title: string
    description: string
}

const state = reactive({
    items: [] as Item[],
})

onMounted(async () => {
    state.items = await getProducts()
})

defineExpose({
    state,
})
</script>

<style lang="scss" scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 8px;
}

router-link {
    display: inline-block;
    padding: 8px;
    background-color: #f5f5f5;
    color: #333;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

router-link:hover {
    background-color: #eee;
}
</style>
