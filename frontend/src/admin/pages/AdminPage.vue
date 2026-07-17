<template>
  <AdminLoginPage
    v-if="!isAuthenticated"
    @login="handleLogin"
  />

  <AdminDashboard
    v-else
    @logout="logout"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

import AdminLoginPage from "@/admin/pages/AdminLoginPage.vue";
import AdminDashboard from "@/admin/pages/AdminDashboard.vue";

interface LoginForm {
  login: string;
  password: string;
  remember: boolean;
}

const AUTH_STORAGE_KEY = "tango-secret-admin-auth";

const isAuthenticated = ref(
  sessionStorage.getItem(AUTH_STORAGE_KEY) === "true" ||
  localStorage.getItem(AUTH_STORAGE_KEY) === "true",
);

const handleLogin = (form: LoginForm): void => {
  /*
   * Временно, пока нет Go API.
   * Сейчас Naive UI уже проверяет, что поля заполнены.
   */
  if (!form.login || !form.password) {
    return;
  }

  const storage = form.remember ? localStorage : sessionStorage;

  storage.setItem(AUTH_STORAGE_KEY, "true");
  isAuthenticated.value = true;
};

const logout = (): void => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);

  isAuthenticated.value = false;
};
</script>
