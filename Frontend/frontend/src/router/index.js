import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
      {
        path: '/authors',
        name: 'authors',
        component: () => import('../views/AuthorsView.vue'),
      },
      {
        path: '/books',
        name: 'books',
        component: () => import('../views/BooksView.vue'),
      },
      {
        path:'/signin',
        name: 'signin',
        component: () => import('../views/SignInView.vue'),
      },
      {
        path:'/signup',
        name: 'signup',
        component: () => import('../views/SignUpView.vue'),
      },
  ],
})

export default router
