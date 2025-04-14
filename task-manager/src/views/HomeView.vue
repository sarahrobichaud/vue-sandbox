<script setup lang="ts">
import { computed, ref } from 'vue';

import TaskList from '@/components/List/TaskList.vue'
import { HomeView } from '@/model/enums';
import { useTaskStore } from '@/stores/taskStore'

const store = useTaskStore();

const currentView = ref<HomeView>(HomeView.PENDING)

const isPendingSection = computed(() => currentView.value === HomeView.PENDING)
const isCompletedSection = computed(() => currentView.value === HomeView.COMPLETED)

const setView = (view: HomeView) => {
  currentView.value = view
}

</script>

<template>
  <div>
    <div class="todo-header">
      <div class="todo-header-text">
        <button :class="{ selected: isPendingSection }" @click="setView(HomeView.PENDING)">My Tasks</button>
        <button :class="{ selected: isCompletedSection }" @click="setView(HomeView.COMPLETED)">{{
          store.completedTaskCount }} Completed</button>
      </div>
      <RouterLink to="/task/new" class="primary btn">
        Add New Task
      </RouterLink>
    </div>

    <div v-if="isPendingSection">
      <div class="pinned-section" v-if="!store.hasPendingTasks">
        <p>No pending tasks ✅</p>
      </div>
      <div class="section" v-else>
        <TaskList :tasks="store.pendingTaskList" title="Pending" />
      </div>
    </div>
    <div class="section" v-else>
      <TaskList :tasks="store.completedTaskList" title="Completed" />
    </div>
  </div>
</template>

<style scoped>
.todo-header-text {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 0;

  button {
    padding: 0.2rem;
    background-color: transparent;
    font-weight: 600;
    color: var(--color-text-soft);
    box-shadow: none;
    border: none;
    font-size: 1.7rem;
    border-radius: 0;
    outline: none;
    cursor: pointer;
    opacity: 0.5;
  }

  button.selected {
    opacity: 1;
    color: var(--color-accent-soft);
  }

  button:hover {
    opacity: 0.8
  }
}


.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-accent);
}

.section {
  margin-bottom: 1rem;
  min-height: 300px;
}

.pinned-section {
  margin-bottom: 1rem;
}

.new-todo-btn {
  background-color: var(--color-accent);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
}

.new-todo-btn:hover {
  background-color: var(--color-accent-soft);
  color: var(--color-background-mute);
}
</style>