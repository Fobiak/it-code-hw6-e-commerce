<template>
    <header>
        <nav>
            <el-input
                v-model="searchQuery"
                placeholder="Поиск..."
                @keyup.enter="search"
                style="width: 200px"
            ></el-input>
            <el-button type="primary" @click="search">Найти</el-button>
            <el-button type="text" @click="store.toggleFilter">Фильтр</el-button>
            <el-button v-if="showListButton" type="text" @click="$router.push('/')">Список элементов</el-button>
            <el-select
                v-model="store.selectedCategory"
                placeholder="Выберите категорию"
                style="width: 200px"
                @change="store.filterByCategory"
                v-show="showFilter"
            >
                <el-option
                    v-for="category in store.categories"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                ></el-option>
            </el-select>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { computed, defineExpose, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import 'element-plus/theme-chalk/index.css';
import { useECommerceStore } from '../store/e-commerce-store';

const route = useRoute();
const $router = useRouter();
const store = useECommerceStore();

const showListButton = computed(() => route.name !== 'list')

onMounted(async () => {
    await store.fetchCategories();
});

defineExpose({
    searchQuery: store.searchQuery,
    selectedCategory: store.selectedCategory,
    toggleFilter: store.toggleFilter,
    search: store.search,
    filterByCategory: store.filterByCategory,
    showFilter: store.showFilter,
    categories: store.categories,
});
</script>

<style lang="scss" scoped>
header {
    background-color: #2196f3;
    color: #fff;
    padding: 20px;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
}

.search-input {
    width: 200px;
    margin-right: 8px;
}

.category-select {
    width: 200px;
}

.el-button {
    font-size: 16px;
    color: #fff;
}
</style>