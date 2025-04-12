import { computed, ref, watch, type Ref } from 'vue'
import type { SubTaskCreateRequest } from '@/model/Tasks'

export function useSubTaskFormValidation(form: Ref<SubTaskCreateRequest>) {

    const isDirty = ref(false)

    watch(() => form.value.title, () => {
        isDirty.value = true
    })

    const titleError = computed(() => {
        return form.value.title.length < 3
            ? 'Title must be at least 3 characters'
            : null
    })

    const isFormValid = computed(() => {
        return !titleError.value
    })

    return {
        titleError,
        isFormValid,
        isDirty
    }
}