<script setup lang="ts">
import { useRouter } from 'vue-router'
import TaskForm from '@/components/form/TaskForm.vue'

const router = useRouter()

function handleSubmitted(id: number) {
  router.push(`/task/details/${id}`)
}

function handleCancelled() {
  router.push('/')
}

</script>

<template>
  <div class="new-todo-page">
    <h1>Create a new Task</h1>
    <TaskForm @submitted="handleSubmitted" @cancelled="handleCancelled"/>
  </div>
</template>

<style scoped>

h1 {
  margin-bottom: 2rem;
}

</style>

