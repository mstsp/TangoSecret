<template>
  <main class="admin-dashboard">
    <header class="admin-dashboard__header">
      <div>
        <p class="admin-dashboard__eyebrow">Tango Secret</p>
        <h1 class="admin-dashboard__title">Admin panel</h1>
      </div>

      <NButton secondary @click="emit('logout')">
        Выйти
      </NButton>
    </header>

    <section class="admin-dashboard__content">
      <h2>Добро пожаловать!</h2>

      <p>
        Следующим шагом здесь появятся разделы расписания и цен.
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";

const emit = defineEmits<{
  logout: [];
}>();
</script>

<style scoped lang="scss">
.admin-dashboard {
  min-height: 100svh;
  padding: 40px;
  color: #171717;
  background-color: #f3eeee;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    max-width: 1400px;
    margin: 0 auto 32px;
    padding: 24px 32px;
    background-color: #ffffff;
  }

  &__eyebrow {
    margin: 0 0 4px;
    color: #777777;
  }

  &__title {
    margin: 0;
    font-family: "Oswald", sans-serif;
    font-size: 32px;
    text-transform: uppercase;
  }

  &__content {
    max-width: 1400px;
    min-height: 500px;
    margin-inline: auto;
    padding: 32px;
    background-color: #ffffff;
  }
}

@media (max-width: 599px) {
  .admin-dashboard {
    padding: 16px;

    &__header {
      padding: 20px;
    }

    &__content {
      padding: 20px;
    }
  }
}
</style>
