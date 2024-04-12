import { createRouter, createWebHistory } from 'vue-router'

// Main
import HomeView from '../views/HomeView.vue'

// Auth
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";

// Layouts
import MainLayout from "@/layouts/MainLayout";

// Pages
import ProfileView from "@/views/ProfileView";

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: MainLayout,
    },
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: MainLayout,
    },
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: MainLayout,
    },
    component: RegisterView,
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: MainLayout,
    },
    component: ProfileView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _from, next) => {
  await import("../assets/style/main.css");
  next();
});

export default router
