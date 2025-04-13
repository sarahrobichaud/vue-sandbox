<script setup lang="ts">

import TaskCard from '@/components/List/TaskCard.vue'
import type { TaskPreview } from '@/model/Tasks';


const { tasks, title } = defineProps<{
  tasks: TaskPreview[]
  title: string
}>()

</script>

<template>
  <div class="todo-list">
    <div class="section">
      <h3>{{ title }}</h3>
      <div class="card-list" v-if="tasks.length > 0">
        <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
      </div>
      <div v-else>
        <p>No {{ title.toLowerCase() }} tasks</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  margin-bottom: 1rem;
  font-weight: 500;
  opacity: 0.7;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.priority-select {
  padding: 0.5rem;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background-color: var(--color-background-soft);
  outline: none;
  transition: border-color 0.2s;
  cursor: pointer;
}

.priority-select:focus {
  border-color: var(--color-accent);
}


.add-todo-form input {
  flex: 1;
  padding: 0.5rem;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background-color: var(--color-background-soft);
  outline: none;
  transition: border-color 0.2s;
}

.add-todo-form button {
  background-color: var(--color-accent);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>