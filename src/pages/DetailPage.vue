<template>
    <div>
        <h1>{{ state.item.title }}</h1>
        <p>{{ state.item.description }}</p>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, defineExpose } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '../api'
import 'element-plus/theme-chalk/index.css'

interface Item {
    id: number
    title: string
    description: string
}

const state = reactive({
    item: {} as Item,
})

const route = useRoute()

onMounted(async () => {
    state.item = await getProduct(Number(route.params.id))
})

defineExpose({
    state,
})
</script>

<style lang="scss" scoped>
h1 {
    font-size: 32px;
    margin-bottom: 16px;
}

p {
    font-size: 18px;
    line-height: 1.5;
}

.el-button {
    margin-top: 16px;
}
</style>