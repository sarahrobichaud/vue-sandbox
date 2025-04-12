import { computed, ref, watch, type Ref } from 'vue'
import type { TaskCreateRequest } from '@/model/Tasks'

export function useTaskFormValidation(form: Ref<TaskCreateRequest>) {

    const isDirty = ref(false)

    watch(() => [form.value.title, form.value.description, form.value.priority], () => {
        isDirty.value = true
    })

    const titleError = computed(() => {
        return form.value.title.length < 3
            ? 'Title must be at least 3 characters'
            : ''
    })

    const priorityError = computed(() => {
        return form.value.priority.length === 0
            ? 'Priority is required'
            : ''
    })



    const descriptionError = computed(() => {
        if (form.value.description.length === 0) return ''
        return form.value.description.length < 10
            ? 'Description must be at least 10 characters'
            : ''
    })

    const isFormValid = computed(() => {
        return !titleError.value && !descriptionError.value && !priorityError.value
    })

    return {
        titleError,
        descriptionError,
        priorityError,
        isFormValid,
        isDirty
    }
}