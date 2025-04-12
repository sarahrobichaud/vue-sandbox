import { ref } from 'vue'
import type { SubTaskCreateRequest } from '@/model/Tasks'

export function useSubTaskForm(parentId: number) {

    const form = ref<SubTaskCreateRequest>({
        title: '',
        parentId: parentId
    })

    const resetForm = () => {
        form.value = {
            title: '',
            parentId: parentId
        }
    }

    return {
        form,
        resetForm
    }
}