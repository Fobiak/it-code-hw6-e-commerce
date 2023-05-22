<template>
    <div>
        <ul>
            <li v-for="item in store.items" :key="item.id">
                <router-link :to="{ name: 'detail', params: { id: item.id } }">{{ item.title }}</router-link>
            </li>
        </ul>
        <div ref="observerTarget" style="width: 100%; height: 1px;"></div>
    </div>
</template>

<script setup lang="ts">
import { defineExpose, onMounted, ref } from 'vue'
import { useECommerceStore } from '../store/e-commerce-store'
import 'element-plus/dist/index.css'

const store = useECommerceStore()

const observerTarget = ref(null)

const loadItems = async () => {
    await store.loadItems()
}

const initObserver = () => {
    const options = {
        root: null as Element | null,
        rootMargin: '0px',
        threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadItems();
        }
    }, options as IntersectionObserverInit);

    observer.observe(observerTarget.value as Element);
};

onMounted(() => {
    loadItems()
    initObserver()
})

defineExpose({
    store,
})
</script>


<style lang="scss" scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 8px;
}

router-link {
    display: inline-block;
    padding: 8px;
    background-color: #f5f5f5;
    color: #333;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

router-link:hover {
    background-color: #eee;
}
</style>
