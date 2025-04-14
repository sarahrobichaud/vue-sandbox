import { createRouter, createWebHistory } from 'vue-router'

import CreateTaskView from '@/views/CreateTaskView.vue'
import EditTaskView from '@/views/EditTaskView.vue'
import HomeView from '@/views/HomeView.vue'
import LayoutView from '@/views/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import TaskDetailView from '@/views/TaskDetailView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutView,
      children: [
        {
          path: '/',
          name: 'home',
          meta: {
            breadcrumb: 'Home'
          },
          component: HomeView,
        },
        {
          path: '/task/new',
          name: 'new-todo',
          meta: {
            breadcrumb: 'New Task'
          },
          component: CreateTaskView,
        },
        {
          path: '/task/details/:id',
          name: 'task-detail',
          meta: {
            breadcrumb: 'Task Detail'
          },
          component: TaskDetailView,
        },
        {
          path: '/task/edit/:id',
          name: 'edit-task',
          meta: {
            breadcrumb: 'Edit Task'
          },
          component: EditTaskView,
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: {
        breadcrumb: 'Not Found'
      },
      component: NotFoundView,
    },
  ],
})

export default router
