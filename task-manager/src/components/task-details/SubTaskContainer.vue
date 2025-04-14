<script setup lang="ts">
import { computed, ref } from 'vue';

import { icons } from '@/components/icons';
import SubTask from '@/components/task-details/SubTask.vue';
import SubTaskForm from '@/components/task-details/SubTaskForm.vue';
import type { SubTaskItem } from '@/model/Tasks';
import { useTaskStore } from '@/stores/taskStore';

const { subTasks, parentId } = defineProps<{
    subTasks: SubTaskItem[]
    parentId: number
}>()

const store = useTaskStore()
const creatingSubTask = ref(subTasks.length === 0)
const expanded = ref(subTasks.length === 0)

const cancelCreatingSubTask = () => {
    creatingSubTask.value = false
}

const addSubTask = (title: string) => {
    store.attachSubTask({
        title: title,
        parentId: parentId
    })
    cancelCreatingSubTask()
}

const toggleExpanded = () => {
    if (expanded.value) {
        creatingSubTask.value = false
    }
    expanded.value = !expanded.value
}

const toggleCreatingSubTask = () => {
    if (!expanded.value) {
        expanded.value = true
    }
    creatingSubTask.value = !creatingSubTask.value
}

const deleteSubTask = (subTaskId: number) => {
    confirm('Are you sure you want to delete this sub task?') && store.deleteSubTask(subTaskId)
}

const newSubTaskShouldFocus = computed(() => subTasks.length > 0)

const expandIcon = computed(() => expanded.value ? icons.retract : icons.expand)
const hasSubTasks = computed(() => subTasks.length > 0)
const subTasksCount = computed(() => subTasks.length)

</script>

<template>
    <div class="header">
        <h3 v-if="hasSubTasks">{{ subTasksCount }} Sub Tasks</h3>
        <h3 v-else>Sub Tasks</h3>
        <div class="action-group">
            <button v-if="!creatingSubTask" @click="toggleCreatingSubTask" v-html="icons.plus"></button>
            <button @click="toggleExpanded" v-if="subTasks.length > 0" v-html="expandIcon"></button>
        </div>
    </div>
    <transition name="slide-fade">
        <div class="list" v-if="expanded">
            <div v-if="creatingSubTask">
                    <div class="sub-task-container">
                        <SubTaskForm @cancelled="cancelCreatingSubTask" @submitted="addSubTask" :parentId="parentId"
                            :shouldFocus="newSubTaskShouldFocus" />
                    </div>
            </div>
            <div class="sub-task-container" v-for="subTask in subTasks" :key="subTask.id">
                <SubTask :subTask="subTask" @delete="deleteSubTask" />
            </div>
        </div>
    </transition>
</template>


<style scoped>
.slide-fade-enter-active {
    transform-origin: top;
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transform-origin: top;
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: scaleY(0);
    opacity: 0;
}

.card {
    max-width: 100%;
}

.sub-task-container {
    max-width: 100%;
    background-color: var(--color-background-soft);
    border-bottom: 2px solid var(--color-border);
    padding: 0.5rem;

}

.action-group {
    display: flex;
    gap: 0.5rem;
}

.list {
    z-index: 1;
}

.header {
    z-index: 5;
    min-height: 5rem;
    border-bottom: 3px solid var(--color-accent);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    background-color: transparent;
    border: none;
    color: var(--color-accent);
    cursor: pointer;
    padding: 0.5rem;
}

button:hover {
    color: var(--color-accent-soft);
    border-radius: 0.5rem;
    background-color: var(--color-background-mute);
}

.header {
    padding: 1rem;
    background-color: var(--color-background-soft);
}
</style>
