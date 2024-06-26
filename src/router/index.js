import { createRouter, createWebHistory } from 'vue-router';

// Admin
import AdminLayout from "@/Admin/layouts/AdminLayout.vue";
import MainView from "@/Admin/views/MainView.vue";

// ----- users ----
import UserCreateView from "@/Admin/views/users/CreateView.vue";
import UserEditView from "@/Admin/views/users/EditView.vue";
import UserListView from "@/Admin/views/users/ListView.vue";

// ----- instructors ----
import InstructorListView from "@/Admin/views/instructors/ListView.vue";
import InstructorSalaryListView from "@/Admin/views/instructors/SalaryListView.vue";

// ----- clubs ----
import ClubCreateView from "@/Admin/views/clubs/CreateView.vue";
import ClubEditView from "@/Admin/views/clubs/EditView.vue";
import ClubListView from "@/Admin/views/clubs/ListView.vue";

// ----- studios ----
import StudioCreateView from "@/Admin/views/studios/CreateView.vue";
import StudioEditView from "@/Admin/views/studios/EditView.vue";
import StudioListView from "@/Admin/views/studios/ListView.vue";

// ----- group classes ----
import GroupClassViewAttendeeList from "@/Admin/views/classes/AttendeeListView.vue";
import GroupClassCreateView from "@/Admin/views/classes/CreateView.vue";
import GroupClassEditView from "@/Admin/views/classes/EditView.vue";
import GroupClassListView from "@/Admin/views/classes/ListView.vue";


// // ----- feedback ----
// import FeedbackListView from "@/Admin/views/feedbacks/ListView.vue";
// import FeedbackEditView from "@/Admin/views/feedbacks/EditView.vue";
// import FeedbackCreateView from "@/Admin/views/feedbacks/CreateView.vue";


// Main
import HomeView from '../views/HomeView.vue';

// Auth
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";

// Layouts
import MainLayout from "@/layouts/MainLayout";

// Pages
import AuthLayout from "@/layouts/AuthLayout";
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
    path: "/admin/instructors/list",
    name: "admin-instructors-list",
    component: InstructorListView,
    meta: {
      layout: AdminLayout,
    },
  },
  {
    path: "/admin/instructors/salary/:id",
    name: "admin-instructors-salary",
    component: InstructorSalaryListView,
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
  {
    path: "/admin/classes/view-attendees/:id",
    name: "admin-classes-view-attendees",
    component: GroupClassViewAttendeeList,
    meta: {
      layout: AdminLayout,
    },
    props: true,
  }
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
