<script setup lang="ts">
import { useSubTaskForm } from '@/composables/forms/subtask/useSubTaskForm';
import { useSubTaskFormValidation } from '@/composables/forms/subtask/useSubTaskFormValidation';

const { parentId, shouldFocus = false } = defineProps<{
    parentId: number
    shouldFocus?: boolean
}>()

const emit = defineEmits<{
    (e: 'submitted', title: string): void,
    (e: 'cancelled'): void
}>()

const vFocus = {
    mounted: (el: HTMLInputElement) => shouldFocus && el.focus()
}

const { form } = useSubTaskForm(parentId)
const { titleError, isFormValid, isDirty } = useSubTaskFormValidation(form)

const handleSubmit = () => {
    if (!isFormValid.value) return
    emit('submitted', form.value.title)
}

</script>
<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <div class="form-group-input">
                <input type="text" placeholder="What needs to be done?" v-model="form.title" v-focus />
                <span v-if="titleError && isDirty" class="error">{{ titleError }}</span>
            </div>
            <div class="action-group">
                <button type="button" class="secondary" @click="emit('cancelled')">Cancel</button>
                <button type="submit" class="primary">Add</button>
            </div>
        </div>
    </form>
</template>

<style scoped>
.form-group-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group {
    margin-bottom: 0;
    display: flex;
    align-items: start;
}

.action-group {
    margin-bottom: 0;
    max-width: 20%;
}
</style>
