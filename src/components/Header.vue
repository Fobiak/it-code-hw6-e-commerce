<template>
    <header>
        <nav>
            <el-button v-if="showListButton" type="text" @click="$router.push('/')">Список элементов</el-button>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { computed, defineExpose } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'element-plus/theme-chalk/index.css'

const route = useRoute()
const $router = useRouter()

const showListButton = computed(() => route.name !== 'list')

defineExpose({
    showListButton,
    $router,
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
    justify-content: flex-end;
}

.el-button {
    font-size: 16px;
    color: #fff;
}
</style>