<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumbStore'

const route = useRoute()
const breadcrumbStore = useBreadcrumbStore()

const breadcrumbs = computed(() => {
    const crumbs: { name: string; path: string }[] = []
    
    if (route.path !== '/') {
        crumbs.push({
            name: breadcrumbStore.currentBreadcrumb || route.meta.breadcrumb as string || route.name as string,
            path: route.path
        })
    }
    
    return crumbs
})

</script>

<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="breadcrumb-item" v-for="(crumb, index) in breadcrumbs" :key="index">
                    <router-link :to="crumb.path">{{ crumb.name }}</router-link>
                </li>
            </ol>
        </nav>
        <router-view />
    </div>
</template>

<style scoped>

.breadcrumb {
    margin-left: 0;
    padding-left: 0;
    font-size: 1.2rem;
}

.breadcrumb-item {
    display: inline;
}

.breadcrumb-item + .breadcrumb-item::before {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    content: "/";
    color: var(--color-text);
 }

.breadcrumb-item a {
    color: var(--color-accent-soft);
    text-decoration: none;
}

.breadcrumb-item:is(:last-child) a {
    color: var(--color-accent);
    cursor: default;
}

.breadcrumb-item:not(:last-child) a:hover {
    text-decoration: underline;
    color: var(--color-accent);
}
</style>