<template>
    <div>
        <h1>Товары категории "{{ category.name }}"</h1>
        <ul>
            <li v-for="item in store.items" :key="item.id">
                <router-link :to="{ name: 'detail', params: { id: item.id } }">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, defineExpose } from 'vue'
import { useRoute } from 'vue-router'
import { useECommerceStore } from '../store/e-commerce-store'
import 'element-plus/dist/index.css'

const route = useRoute()
const store = useECommerceStore()

const category = reactive({
    id: Number(route.params.id),
    name: '',
})

const loadProductsByCategory = async (categoryId: number) => {
    await store.fetchProductsByCategory(categoryId)
}

onMounted(async () => {
    await loadCategoryName(category.id)
    await loadProductsByCategory(category.id)
})

watch(() => route.params.id, async (newCategoryId) => {
    category.id = Number(newCategoryId)
    await loadCategoryName(category.id)
    await loadProductsByCategory(category.id)
})

const loadCategoryName = async (categoryId: number) => {
    await store.fetchCategories()
    const foundCategory = store.categories.find((cat) => cat.id === categoryId)
    category.name = foundCategory ? foundCategory.name : ''
}

defineExpose({
    store,
    category,
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
