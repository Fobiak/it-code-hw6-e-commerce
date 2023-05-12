<template>
    <div>
        <h1>{{ state.item.title }}</h1>
        <p>{{ state.item.description }}</p>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '../api'

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
</script>

<script lang="ts">
import {state} from "vue-tsc/out/shared";

export default {
    setup() {
        return {
            state,
        }
    },
}
</script>