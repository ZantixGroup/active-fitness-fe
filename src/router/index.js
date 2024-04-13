import { createRouter, createWebHistory } from 'vue-router'

// Admin
import AdminLayout from "@/Admin/layouts/AdminLayout.vue";
import MainView from "@/Admin/views/MainView.vue";

// ----- users ----
import UserListView from "@/Admin/views/users/ListView.vue";
import UserEditView from "@/Admin/views/users/EditView.vue";
import UserCreateView from "@/Admin/views/users/CreateView.vue";

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
  },
  // Admin
  {
    path: "/admin",
    name: "admin",
    component: MainView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/users/list",
    name: "admin-users-list",
    component: UserListView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/users/create",
    name: "admin-users-create",
    component: UserCreateView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/users/edit/:id",
    name: "admin-users-edit",
    component: UserEditView,
    meta: {
      layout: AdminLayout,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _from, next) => {
  if (to.meta.layout && to.meta.layout.name === "AdminLayout") {
    await import("../Admin/assets/style/style.css");

    // if (UserData.Permissions && UserData.Permissions.includes("view.admin")) {
    //   next();
    //   return 0;
    // }
    next();
    return 0;
  }
  await import("../assets/style/main.css");
  next();
});

export default router
