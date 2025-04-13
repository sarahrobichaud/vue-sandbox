<script setup lang="ts">
import { icons } from '@/components/icons';
import type { TaskPreview } from '@/model/Tasks';
import { Priority } from '@/model/enums';
import { useTaskStore } from '@/stores/taskStore';
const taskStore = useTaskStore();

const { task } = defineProps<{
    task: TaskPreview
}>()

const options = [Priority.LOW, Priority.MEDIUM, Priority.HIGH] satisfies Priority[];

function handlePriorityChange() {
    taskStore.updateTask({
        id: task.id,
        priority: task.priority
    })
}

function handleDelete() {
    if (confirm('This will delete the task and all its subtasks. Are you sure?')) {
        taskStore.deleteTask(task.id)
    }
}

</script>

<template>
    <div v-if="!task.completed">
        <select v-model="task.priority" @change="handlePriorityChange">
            <option v-for="priority in options" :key="priority" :value="priority">
                {{ priority }}
            </option>
        </select>
        <router-link :to="`/task/details/${task.id}`">
            <button class="secondary">View</button>
        </router-link>
    </div>
    <div v-else>
        <button class="secondary" @click="handleDelete" v-html="icons.trash"></button>
    </div>
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

a {
    text-decoration: none;
}
</style>
