<script setup lang="ts">

import { computed, ref } from 'vue'

import { useTaskActions } from '@/composables/forms/task/useTaskActions'
import { useTaskForm } from '@/composables/forms/task/useTaskForm'
import { useTaskFormValidation } from '@/composables/forms/task/useTaskFormValidation'
import type { TaskItem } from '@/model/Tasks'
import { Priority } from '@/model/enums'

const { task } = defineProps<{
  task?: TaskItem
}>()

const emit = defineEmits<{
  (e: 'submitted', id: number): void;
  (e: 'cancelled'): void;
}>()

const isSubmitting = ref(false)

const { resetForm, isEdit, form } = useTaskForm(task)
const { createTask, updateTask } = useTaskActions()
const { titleError, descriptionError, priorityError, isFormValid, isDirty } = useTaskFormValidation(form)

const actionText = computed(() => {
  return isSubmitting.value ? 'Submitting...' : (isEdit.value ? 'Update Task' : 'Create Task')
})

async function handleSubmit() {

  let redirectId = 0;

  if (!isFormValid.value) return

  try {
    isSubmitting.value = true

    if (isEdit.value && task) {
      redirectId = await updateTask({ ...form.value, id: task.id })
    } else {
      redirectId = await createTask(form.value)
    }

    emit('submitted', redirectId)

    // In case no redirect is made
    resetForm()

  } catch (error) {

    console.error('Form submission failed:', error)

  } finally {
    isSubmitting.value = false
  }
}

function handleCancel() {

  if (isDirty.value) {
    if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
      emit('cancelled')
    }
  } else {
    emit('cancelled')
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="card">
    <div class="form-group">
      <div>
        <label for="todo-title" class="">Task Title</label>
        <input id="todo-title" class="form-group-input" v-model.trim="form.title" type="text"
          placeholder="Enter todo title..." :class="{ 'error': titleError }" required />
        <span v-if="titleError && isDirty" class="error-text">{{ titleError }}</span>
      </div>
    </div>
    <div class="form-group">
      <div>
        <label for="todo-priority">Task Priority</label>
        <select id="todo-priority" v-model="form.priority">
          <option value="" selected>Select Priority</option>
          <option v-for="priority in Object.values(Priority)" :key="priority">{{ priority }}</option>
        </select>
        <span v-if="priorityError && isDirty" class="error-text">{{ priorityError }}</span>
      </div>
    </div>
    <div class="form-group">
      <div>
        <label for="todo-description">Task Description</label>
        <textarea id="todo-description" rows="4" v-model.trim="form.description" placeholder="Enter todo description..."
          :class="{ 'error': descriptionError }"></textarea>
        <span v-if="descriptionError" class="error-text">
          {{ descriptionError }}
        </span>
      </div>
    </div>

    <div class="action-group">
      <button type="button" @click="handleCancel" class="secondary" :disabled="isSubmitting">
        Cancel
      </button>
      <button type="submit" class="primary" :disabled="!isFormValid || isSubmitting">
        {{ actionText }}
      </button>
    </div>
  </form>
</template>
