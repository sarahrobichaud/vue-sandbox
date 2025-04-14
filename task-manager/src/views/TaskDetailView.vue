<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref, } from 'vue';
import { useRoute } from 'vue-router'

import TaskInfo from '@/components/task-details/TaskInfo.vue';
import type { TaskWithDetails } from '@/model/Tasks';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import { useTaskStore } from '@/stores/taskStore';
import router from '@/router';

const route = useRoute()

const store = useTaskStore()
const breadcrumbStore = useBreadcrumbStore()

const task = computed<TaskWithDetails | null>(() => {
  return store.getTask(parseInt(route.params.id as string));
})

onBeforeMount(() => {
  const idString = route.params.id as string
  const id = Number(idString)

  if (Number.isNaN(id)) {
    router.push('/not-found')
    return;
  }

  const match = store.getTask(id)

  if (match == null || match.completed) {
    router.push('/not-found')
    return;
  }

  breadcrumbStore.setBreadcrumb(task.value?.title ?? '')
})

onBeforeUnmount(() => {
  breadcrumbStore.setBreadcrumb('')
})

</script>

<template>
  <div v-if="task">
    <TaskInfo :task="task" />
  </div>
</template>

<style scoped>
div {
  padding: 2rem 0;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
