<template>
    <div class="detail-page">
        <div class="detail-header">
            <h1>{{ store.item.title }}</h1>
            <p class="price">$ {{ store.item.price }}</p>
        </div>
        <div class="detail-content">
            <img class="image" :src="store.item.images" alt="Item Image" />
            <p class="description">{{ store.item.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineExpose, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useECommerceStore } from '../store/e-commerce-store'
import 'element-plus/dist/index.css'

const store = useECommerceStore()
const route = useRoute()

onMounted(async () => {
    const id = Number(route.params.id)
    await store.fetchProduct(id)
})

defineExpose({
    store,
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