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
            <el-button type="text" @click="toggleFilter">Фильтр</el-button>
            <el-button v-if="showListButton" type="text" @click="$router.push('/')">Список элементов</el-button>
            <el-select
                v-model="selectedCategory"
                placeholder="Выберите категорию"
                style="width: 200px"
                @change="filterByCategory"
                v-show="showFilter"
            >
                <el-option
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.name"
                    :value="category.id"
                ></el-option>
            </el-select>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, computed, defineExpose, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCategories } from '../api'
import 'element-plus/theme-chalk/index.css'

const route = useRoute()
const $router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('')
const showFilter = ref(false)
const categories = ref([])

const showListButton = computed(() => route.name !== 'list')

const toggleFilter = () => {
    showFilter.value = !showFilter.value
}

const search = () => {
    if (searchQuery.value) {
        $router.push(`/search/${searchQuery.value}`)
    }
}

const filterByCategory = () => {
    if (selectedCategory.value) {
        $router.push(`/category/${selectedCategory.value}`)
    }
}

onMounted(async () => {
    categories.value = await getCategories()
})

defineExpose({
    showListButton,
    searchQuery,
    selectedCategory,
    toggleFilter,
    search,
    filterByCategory,
    showFilter,
    categories,
})
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