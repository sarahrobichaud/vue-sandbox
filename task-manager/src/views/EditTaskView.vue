<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import TaskForm from "@/components/form/TaskForm.vue"
import type { TaskItem } from '@/model/Tasks'
import { useBreadcrumbStore } from '@/stores/breadcrumbStore'
import { useTaskStore } from '@/stores/taskStore'

const store = useTaskStore()
const router = useRouter()
const route = useRoute()

const task = ref<TaskItem | undefined>(undefined)

const breadcrumbStore = useBreadcrumbStore()


onBeforeMount(() => {
  const taskId = route.params.id

  const match = store.getTask(Number(taskId))

  if (!match) {
    router.push('/not-found') // or to a 404 page
    return
  }

  task.value = match
})

onMounted(() => {
  breadcrumbStore.setBreadcrumb(`Edit ${task.value?.title}`)
})

onBeforeUnmount(() => {
  breadcrumbStore.setBreadcrumb('')
})

function handleSubmitted(id: number) {
  router.push(`/task/details/${id}`)
}

function handleCancelled() {
  router.push(`/task/details/${task.value?.id}`)
}

</script>

<template>
  <div class="new-todo-page">
    <h1>Edit Task</h1>
    <TaskForm :task="task" @submitted="handleSubmitted" @cancelled="handleCancelled" />
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
