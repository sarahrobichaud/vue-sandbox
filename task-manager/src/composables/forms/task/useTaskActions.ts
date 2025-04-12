import type { TaskCreateRequest, TaskUpdateRequest } from '@/model/Tasks'
import { useTaskStore } from '@/stores/taskStore'

export function useTaskActions() {
    const store = useTaskStore()

    const createTask = async (task: TaskCreateRequest): Promise<number> => {
        await new Promise(resolve => setTimeout(() => resolve(true), 1000));

        try {
            const id = store.addTask(task)
            return id
        } catch {
            return 0
        }
    }

    const updateTask = async (task: TaskUpdateRequest): Promise<number> => {

        await new Promise(resolve => setTimeout(() => resolve(true), 1000));

        try {
            store.updateTask(task)
            return task.id
        } catch {
            return 0
        }
    }

    return {
        createTask,
        updateTask
    }
}
