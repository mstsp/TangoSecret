import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PathNotFound from "@/components/PathNotFound.vue"
import MainPage from "@/components/MainPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  // {
  //   path: '/questions',
  //   name: 'Questions',
  //   component: QuestionsList,
  // },
  // {
  //   path: '/prompt-view',
  //   name: 'PromptView',
  //   component: PromptView,
  // },
  {
    path: "/:catchAll(.*)",
    component: PathNotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
