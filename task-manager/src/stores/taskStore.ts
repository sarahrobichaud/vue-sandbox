import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  SubTaskCreateRequest,
  SubTaskItem,
  TaskCreateRequest,
  TaskItem,
  TaskPreview,
  TaskUpdateRequest,
  TaskWithDetails
} from '@/model/Tasks'

export const useTaskStore = defineStore('task', () => {
  // State
  const tasks = ref<TaskItem[]>([])
  const subTasks = ref<SubTaskItem[]>([])

  // Getters
  const completedTaskList = computed(() =>
    tasks.value
      .filter(task => task.completed)
      .map(task => createTaskPreview(task))
  )

  const pendingTaskList = computed(() =>
    tasks.value
      .filter(task => !task.completed)
      .map(task => createTaskPreview(task))
  )

  const hasCompletedTasks = computed(() => completedTaskList.value.length > 0)
  const hasPendingTasks = computed(() => pendingTaskList.value.length > 0)
  const completedTaskCount = computed(() => completedTaskList.value.length)

  // Helper functions
  function createTaskPreview(task: TaskItem): TaskPreview {
    const children = subTasks.value.filter(st => st.parentId === task.id)
    const completedSubTasks = children.filter(st => st.completed)
    const progress = children.length
      ? Math.round((completedSubTasks.length / children.length) * 100)
      : 0

    return {
      ...task,
      progress,
      subTaskCount: children.length
    }
  }

  // Actions
  function addTask(task: TaskCreateRequest) {
    const newTask: TaskItem = {
      id: Date.now(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      completed: false,
    }
    tasks.value.push(newTask)
    return newTask.id
  }

  function attachSubTask(subTask: SubTaskCreateRequest) {
    const newSubTask: SubTaskItem = {
      id: Date.now(),
      title: subTask.title,
      completed: false,
      parentId: subTask.parentId
    }
    subTasks.value.push(newSubTask)
  }

  function getTask(id: number): TaskWithDetails | null {
    const task = tasks.value.find(t => t.id === id)

    if (!task) return null

    const taskSubTasks = subTasks.value.filter(st => st.parentId === task.id)
    const completedSubTasks = taskSubTasks.filter(st => st.completed)
    const progress = taskSubTasks.length
      ? Math.round((completedSubTasks.length / taskSubTasks.length) * 100)
      : 0

    return {
      ...task,
      subTasks: taskSubTasks,
      progress,
      subTaskCount: taskSubTasks.length,
      hasSubTasks: taskSubTasks.length > 0
    }
  }

  function updateTask(task: TaskUpdateRequest) {
    const index = tasks.value.findIndex(t => t.id === task.id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...task }
    }
  }

  function updateSubTask(subTaskId: number, updates: Partial<SubTaskItem>) {
    const index = subTasks.value.findIndex(st => st.id === subTaskId)
    if (index !== -1) {
      subTasks.value[index] = { ...subTasks.value[index], ...updates }
    }
  }

  function deleteTask(taskId: number) {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
    subTasks.value = subTasks.value.filter(st => st.parentId !== taskId)
  }

  function deleteSubTask(subTaskId: number) {
    subTasks.value = subTasks.value.filter(st => st.id !== subTaskId)
  }

  return {
    // State
    tasks,
    subTasks,
    // Getters
    completedTaskList,
    pendingTaskList,
    hasCompletedTasks,
    hasPendingTasks,
    completedTaskCount,
    // Actions
    addTask,
    attachSubTask,
    getTask,
    updateSubTask,
    updateTask,
    deleteTask,
    deleteSubTask
  }
}, {
  persist: {
    key: 'task-store',
    storage: localStorage
  }
})