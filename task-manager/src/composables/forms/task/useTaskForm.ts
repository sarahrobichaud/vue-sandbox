import { ref, computed } from 'vue'
import type { TaskCreateRequest, TaskItem } from '@/model/Tasks'
import { Priority } from '@/model/enums'

export function useTaskForm(initialTask?: TaskItem) {

    const form = ref<TaskCreateRequest>({
        title: initialTask?.title ?? '',
        description: initialTask?.description ?? '',
        priority: initialTask?.priority ?? Priority.MEDIUM
    })

    const isEdit = computed(() => initialTask !== undefined)

    const resetForm = () => {
        form.value = {
            title: initialTask?.title ?? '',
            description: initialTask?.description ?? '',
            priority: initialTask?.priority ?? Priority.MEDIUM
        }
    }

    return {
        form,
        isEdit,
        resetForm
    }
}