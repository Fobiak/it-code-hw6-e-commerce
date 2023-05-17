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
import 'element-plus/theme-chalk/index.css'

const state = reactive({
    items: [],
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
    list-style: none;
    margin: 0;
    padding: 0;
}

li {
    margin-bottom: 16px;
}

router-link {
    font-size: 24px;
    color: #2196f3;
    text-decoration: none;
}

router-link:hover {
    text-decoration: underline;
}
</style>