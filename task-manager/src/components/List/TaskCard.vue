<script setup lang="ts">
import { computed } from 'vue';

import TaskCardActionBar from '@/components/List/TaskCardActionBar.vue'
import type { TaskPreview } from '@/model/Tasks'
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore()

const { task } = defineProps<{
  task: TaskPreview
}>()


const actionText = computed(() => {
  return task.completed ? "Restore" : "Mark as Done"
})

const statusCanBeChanged = computed(() => {
  return task.progress >= 100 || task.subTaskCount === 0
})

const handleChangeStatus = () => {
  store.updateTask({
    id: task.id,
    completed: !task.completed
  })
}


</script>


<template>
  <div class="card">
    <div class="todo-item">
      <div class="todo-item-content">
        <div class="todo-content">
          <div class="todo-content-header">
            <h3 :class="{ completed: task.completed }">{{ task.title }}</h3>
          </div>
        </div>
      </div>
      <div class="todo-actions">
        <TaskCardActionBar :task="task" />
      </div>
    </div>
    <div class="footer">
      <span class="progress-container">
        <span class="progress" v-if="task.subTaskCount > 0">{{ task.progress }}%</span>
        <span class="subtask-count">{{ task.subTaskCount }} Subtasks</span>
      </span>
      <button class="btn primary" v-if="statusCanBeChanged" @click="handleChangeStatus">
        {{ actionText }}
      </button>
    </div>
  </div>

</template>

<style scoped>
.footer {
  padding: 0.5rem 0.5rem 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.progress-container {
  gap: 0.5rem;
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;
}

.subtask-count {
  opacity: 0.7;
}

.footer .progress {
  font-weight: 800;
}

.card {
  width: 100%;
  max-width: 100%;
}

.todo-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem;
  border-bottom: 2px solid var(--color-border);
  width: 100%;
}

.todo-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.todo-content-header {
  font-size: 1.2rem;
  font-weight: 700;
}

.todo-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}



.todo-content {
  gap: 0.5rem;
}

.completed {
  text-decoration: line-through;
  opacity: 0.7;
}

.pinned {
  border: 1px solid var(--color-accent);
}

.low {
  border-left: 4px solid green;
}

.medium {
  border-left: 4px solid orange;
}

.high {
  border-left: 4px solid red;
}
</style>