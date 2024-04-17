import { createRouter, createWebHistory } from 'vue-router'

// Admin
import AdminLayout from "@/Admin/layouts/AdminLayout.vue";
import MainView from "@/Admin/views/MainView.vue";

// ----- users ----
import UserListView from "@/Admin/views/users/ListView.vue";
import UserEditView from "@/Admin/views/users/EditView.vue";
import UserCreateView from "@/Admin/views/users/CreateView.vue";

// ----- clubs ----
import ClubListView from "@/Admin/views/clubs/ListView.vue";
import ClubEditView from "@/Admin/views/clubs/EditView.vue";
import ClubCreateView from "@/Admin/views/clubs/CreateView.vue";

// ----- studios ----
import StudioListView from "@/Admin/views/studios/ListView.vue";
import StudioEditView from "@/Admin/views/studios/EditView.vue";
import StudioCreateView from "@/Admin/views/studios/CreateView.vue";

// ----- group classes ----
import GroupClassListView from "@/Admin/views/classes/ListView.vue";
import GroupClassEditView from "@/Admin/views/classes/EditView.vue";
import GroupClassCreateView from "@/Admin/views/classes/CreateView.vue";

// // ----- feedback ----
// import FeedbackListView from "@/Admin/views/feedbacks/ListView.vue";
// import FeedbackEditView from "@/Admin/views/feedbacks/EditView.vue";
// import FeedbackCreateView from "@/Admin/views/feedbacks/CreateView.vue";


// Main
import HomeView from '../views/HomeView.vue'

// Auth
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";

// Layouts
import MainLayout from "@/layouts/MainLayout";

// Pages
import ProfileView from "@/views/ProfileView";
import AuthLayout from "@/layouts/AuthLayout";

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
      layout: AuthLayout,
    },
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: AuthLayout,
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
  {
    path: "/admin/clubs/list",
    name: "admin-clubs-list",
    component: ClubListView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/clubs/create",
    name: "admin-clubs-create",
    component: ClubCreateView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/clubs/edit/:id",
    name: "admin-clubs-edit",
    component: ClubEditView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/studios/list",
    name: "admin-studios-list",
    component: StudioListView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/studios/create",
    name: "admin-studios-create",
    component: StudioCreateView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/studios/edit/:id",
    name: "admin-studios-edit",
    component: StudioEditView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/classes/list",
    name: "admin-classes-list",
    component: GroupClassListView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/classes/create",
    name: "admin-classes-create",
    component: GroupClassCreateView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/classes/edit/:id",
    name: "admin-classes-edit",
    component: GroupClassEditView,
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
