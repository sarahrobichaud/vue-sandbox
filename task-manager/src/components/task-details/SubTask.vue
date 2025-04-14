<script setup lang="ts">
import { computed, ref } from 'vue';

import type { SubTaskItem } from '@/model/Tasks';

import { icons } from '../icons';

const { subTask } = defineProps<{
    subTask: SubTaskItem
}>()


const emit = defineEmits<{
    'delete': [subTaskId: number]
}>()

const checkboxId = computed(() => `subtask-${subTask.id}`)

const showActions = ref(false)

</script>

<template>
    <div @mouseenter="showActions = true" @mouseleave="showActions = false" class="subtask-wrapper">
        <div class="sub-task">
            <div class="sub-task-content">
                <div class="checkbox-wrapper-4">
                    <input class="inp-cbx" :id="checkboxId" type="checkbox" v-model="subTask.completed" />
                    <label class="cbx" :for="checkboxId">
                        <span>
                            <svg width="12px" height="10px">
                                <use xlink:href="#check-4"></use>
                            </svg>
                        </span>
                        <span>{{ subTask.title }}</span>
                    </label>
                    <svg class="inline-svg">
                        <symbol id="check-4" viewbox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </symbol>
                    </svg>
                </div>
            </div>
            <div class="sub-task-actions" v-if="showActions">
                <button class="btn secondary" @click="emit('delete', subTask.id)" v-html="icons.trash"></button>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* Add this new class */
.subtask-wrapper {
    overflow: hidden;
    max-width: 100%;
    position: relative;
}


.checkbox-wrapper-4 span {
    font-size: 20px;
}


.sub-task-content button {
    padding: 0.2rem
}

.sub-task-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.sub-task-actions {
    display: flex;
    gap: 1rem;
}

.sub-task {
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background-color: var(--color-background-soft);
}
</style>
