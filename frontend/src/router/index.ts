import {
  createRouter,
  createWebHistory
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import MainPage from "@/components/MainPage.vue";
import PathNotFound from "@/components/PathNotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/admin/pages/AdminPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PathNotFound",
    component: PathNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
