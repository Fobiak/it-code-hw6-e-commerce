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
import { reactive, onMounted } from 'vue'
import { getProducts } from '../api'

const state = reactive({
    items: [],
})

onMounted(async () => {
    state.items = await getProducts()
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