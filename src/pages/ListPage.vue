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
import { defineExpose, onMounted, onUnmounted, ref } from 'vue'
import { useECommerceStore } from '../store/e-commerce-store'
import 'element-plus/dist/index.css'

const store = useECommerceStore()

const observerTarget = ref(null)

let loading = false
const loadItems = async () => {
    if (loading) return
    loading = true
    await store.loadItems()
    loading = false
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
    return observer
};

let observer: IntersectionObserver | null = null

onMounted(() => {
    loadItems()
    observer = initObserver()
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})

defineExpose({
    store,
})
</script>

<style lang="scss" scoped>
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