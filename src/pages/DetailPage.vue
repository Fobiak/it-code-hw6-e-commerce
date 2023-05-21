<template>
    <div class="detail-page">
        <div class="detail-header">
            <h1>{{ state.item.title }}</h1>
            <p class="price">$ {{ state.item.price }}</p>
        </div>
        <div class="detail-content">
            <img class="image" :src="state.item.images" alt="Item Image" />
            <p class="description">{{ state.item.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, defineExpose } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '../services/api/rest/api'
import 'element-plus/dist/index.css'

interface Item {
    title: string;
    price: number;
    description: string;
    images: string;
}

const state = reactive({
    item: {} as Item,
})

const route = useRoute()

onMounted(async () => {
    const id = Number(route.params.id)
    state.item = await getProduct(id)
})

defineExpose({
    state,
})
</script>

<style lang="scss" scoped>
.detail-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
}

.detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.detail-header h1 {
    font-size: 24px;
    font-weight: bold;
}

.price {
    font-size: 18px;
}

.image {
    max-width: 100%;
    height: auto;
    margin-bottom: 16px;
}

.description {
    font-size: 16px;
    line-height: 1.5;
}
</style>