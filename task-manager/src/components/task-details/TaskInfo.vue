<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import SubTaskContainer from '@/components/task-details/SubTaskContainer.vue';
import { icons } from '@/components/icons';
import type { TaskWithDetails } from '@/model/Tasks';
import { useTaskStore } from '@/stores/taskStore';

const router = useRouter()
const store = useTaskStore()

const { task } = defineProps<{
    task: TaskWithDetails
}>()

const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
        store.deleteTask(task.id)
        router.push('/')
    }
}

const handleMarkAsDone = () => {
    store.updateTask({
        id: task.id,
        completed: true
    })
    router.push('/')
}

const statusEmoji = computed(() => {
    if (task.progress === 100) return '✅'
    if (task.progress > 60) return "🔨"
    if (task.progress > 20) return "🏗️"
    return "🚧"
})
const hasDescription = computed(() => {
    return task.description && task.description.length > 0
})

const allSubtasksCompleted = computed(() => {
    return task.progress >= 100 || task.subTaskCount === 0
})

const title = computed(() => {
    return statusEmoji.value + ' ' + task.title
})

const progress = computed(() => {
    return task.progress + '% Completed -'
})

</script>

<template>
    <div>
        <div class="task-header">
            <h1>{{ title }}</h1>
            <div class="task-actions">
                <button @click="handleDelete" class="btn secondary" v-html="icons.trash">
                </button>
                <RouterLink :to="`/task/edit/${task.id}`" class="btn secondary">
                    Edit Task
                </RouterLink>
                <button class="btn primary" v-if="allSubtasksCompleted" @click="handleMarkAsDone">
                    Mark as Done
                </button>
            </div>
        </div>
        <div class="task-info">
            <p>
                <span v-if="task.hasSubTasks" class="progress">
                    {{ progress }}
                </span>
                {{ task.priority }}
            </p>
        </div>
    </div>
    <div v-if="hasDescription">
        <hr>
        <pre>{{ task.description }}</pre>
        <hr>
    </div>
    <div>
        <SubTaskContainer :subTasks="task.subTasks" :parentId="task.id" />
    </div>
</template>

<style scoped>
hr {
    border: 1px solid var(--color-background-mute);
    margin-block: 1rem;
}

pre {
    padding: 1rem 0;
    ;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    white-space: pre-wrap;
}


.task-actions {
    display: flex;
    gap: 1rem;
}

.task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-info {
    display: flex;
    padding: 0.5rem 0;
    justify-content: space-between;
    align-items: center;
    opacity: 0.7;
}
</style>
