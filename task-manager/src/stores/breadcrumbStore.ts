import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
    const currentBreadcrumb = ref('')
    
    function setBreadcrumb(value: string) {
        currentBreadcrumb.value = value
    }
    
    return {
        currentBreadcrumb,
        setBreadcrumb
    }
})