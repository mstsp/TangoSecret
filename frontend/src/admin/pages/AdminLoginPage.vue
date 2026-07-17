<template>
  <main class="admin-login">
    <div class="admin-login__page">
      <section class="admin-login__content">
        <div class="admin-login__language">
          <button
            v-for="languageItem in languages"
            :key="languageItem.value"
            class="admin-login__language-button"
            :class="{
              'admin-login__language-button--active':
                currentLanguage === languageItem.value,
            }"
            type="button"
            @click="currentLanguage = languageItem.value"
          >
            {{ languageItem.label }}
          </button>
        </div>

        <div class="admin-login__form-wrapper">
          <p class="admin-login__eyebrow">Tango Secret</p>

          <h1 class="admin-login__title">
            {{ content.title }}
          </h1>

          <NForm
            ref="formRef"
            class="admin-login__form"
            :model="form"
            :rules="rules"
            size="large"
            @submit.prevent="submitLogin"
          >
            <NFormItem path="login" :label="content.loginLabel">
              <NInput
                v-model:value="form.login"
                :placeholder="content.loginPlaceholder"
                autocomplete="username"
                clearable
                @keydown.enter="submitLogin"
              />
            </NFormItem>

            <NFormItem path="password" :label="content.passwordLabel">
              <NInput
                v-model:value="form.password"
                type="password"
                show-password-on="mousedown"
                :placeholder="content.passwordPlaceholder"
                autocomplete="current-password"
                @keydown.enter="submitLogin"
              />
            </NFormItem>

            <div class="admin-login__options">
              <NCheckbox v-model:checked="form.remember">
                {{ content.remember }}
              </NCheckbox>
            </div>

            <NButton
              class="admin-login__submit"
              attr-type="submit"
              :loading="isLoading"
              :disabled="isLoading"
              block
            >
              {{ content.submit }}
            </NButton>
          </NForm>

          <p v-if="errorMessage" class="admin-login__error" role="alert">
            {{ errorMessage }}
          </p>

          <RouterLink class="admin-login__back" to="/">
            <span aria-hidden="true">←</span>
            {{ content.back }}
          </RouterLink>
        </div>
      </section>

      <div class="admin-login__image-wrapper">
        <img
          class="admin-login__image"
          :src="loginImage"
          :alt="content.imageAlt"
        />

        <div class="admin-login__image-overlay" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import {
  NButton,
  NCheckbox,
  NForm,
  NFormItem,
  NInput,
} from "naive-ui";
import type {
  FormInst,
  FormRules,
  FormValidationError,
} from "naive-ui";

import loginImage from "@/assets/images/admin/login.jpg";

type Language = "uk" | "ru" | "en";

interface LoginForm {
  login: string;
  password: string;
  remember: boolean;
}

interface LoginContent {
  title: string;
  description: string;
  loginLabel: string;
  loginPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  remember: string;
  submit: string;
  back: string;
  requiredLogin: string;
  requiredPassword: string;
  loginError: string;
  imageAlt: string;
}

const emit = defineEmits<{
  login: [form: LoginForm];
}>();

const languages: Array<{ label: string; value: Language }> = [
  {
    label: "UK",
    value: "uk",
  },
  {
    label: "RU",
    value: "ru",
  },
  {
    label: "EN",
    value: "en",
  },
];

const translations: Record<Language, LoginContent> = {
  uk: {
    title: "Вхід до адміністративної панелі",
    description:
      "Увійдіть, щоб керувати розкладом, цінами та іншими розділами сайту.",
    loginLabel: "Логін",
    loginPlaceholder: "Введіть логін",
    passwordLabel: "Пароль",
    passwordPlaceholder: "Введіть пароль",
    remember: "Запам’ятати мене",
    submit: "Увійти",
    back: "Повернутися на сайт",
    requiredLogin: "Введіть логін",
    requiredPassword: "Введіть пароль",
    loginError: "Не вдалося увійти. Перевірте логін і пароль.",
    imageAlt: "Викладачі школи аргентинського танго",
  },

  ru: {
    title: "Вход в административную панель",
    description:
      "Войдите, чтобы управлять расписанием, ценами и другими разделами сайта.",
    loginLabel: "Логин",
    loginPlaceholder: "Введите логин",
    passwordLabel: "Пароль",
    passwordPlaceholder: "Введите пароль",
    remember: "Запомнить меня",
    submit: "Войти",
    back: "Вернуться на сайт",
    requiredLogin: "Введите логин",
    requiredPassword: "Введите пароль",
    loginError: "Не удалось войти. Проверьте логин и пароль.",
    imageAlt: "Преподаватели школы аргентинского танго",
  },

  en: {
    title: "Admin panel login",
    description:
      "Sign in to manage the schedule, prices and other sections of the website.",
    loginLabel: "Login",
    loginPlaceholder: "Enter your login",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    remember: "Remember me",
    submit: "Sign in",
    back: "Return to the website",
    requiredLogin: "Enter your login",
    requiredPassword: "Enter your password",
    loginError: "Unable to sign in. Check your login and password.",
    imageAlt: "Argentine tango school teachers",
  },
};

const currentLanguage = ref<Language>("uk");
const formRef = ref<FormInst | null>(null);
const isLoading = ref(false);
const errorMessage = ref("");

const form = reactive<LoginForm>({
  login: "",
  password: "",
  remember: false,
});

const content = computed<LoginContent>(
  () => translations[currentLanguage.value],
);

const rules = computed<FormRules>(() => ({
  login: [
    {
      required: true,
      message: content.value.requiredLogin,
      trigger: ["input", "blur"],
    },
  ],
  password: [
    {
      required: true,
      message: content.value.requiredPassword,
      trigger: ["input", "blur"],
    },
  ],
}));

const submitLogin = async (): Promise<void> => {
  errorMessage.value = "";

  try {
    await formRef.value?.validate();

    isLoading.value = true;

    /*
     * Пока backend не подключён, передаём данные родителю.
     * Позже здесь вызовем POST /api/admin/login.
     */
    emit("login", {
      login: form.login,
      password: form.password,
      remember: form.remember,
    });
  } catch (error) {
    const validationErrors = error as FormValidationError[];

    if (!validationErrors?.length) {
      errorMessage.value = content.value.loginError;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped lang="scss">
.admin-login {
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  color: #ffffff;
  background-color: #171717;

  &__page {
    display: grid;
    grid-template-columns: minmax(480px, 1fr) minmax(500px, 1fr);
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #171717;
  }

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    height: 100%;
    padding: clamp(40px, 5vh, 80px) clamp(50px, 7vw, 120px);
    overflow: hidden;
  }

  &__language {
    position: absolute;
    top: 40px;
    right: 48px;
    display: flex;
    gap: 16px;
  }

  &__language-button {
    padding: 5px 0;
    font-family: "Oswald", sans-serif;
    font-size: 14px;
    color: #777777;
    background: transparent;
    border: 0;
    border-bottom: 1px solid transparent;
    cursor: pointer;

    &:hover {
      color: #ffffff;
    }

    &--active {
      color: #ffffff;
      border-color: #ffffff;
    }
  }

  &__form-wrapper {
    width: 100%;
    max-width: 500px;
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-family: Georgia, serif;
    font-size: 15px;
    color: #949393;
  }

  &__title {
    max-width: 500px;
    margin: 0 0 24px;
    font-family: "Oswald", sans-serif;
    font-size: clamp(42px, 4vw, 64px);
    font-weight: 500;
    line-height: 1.08;
    text-transform: uppercase;
  }

  &__description {
    max-width: 440px;
    margin: 0 0 44px;
    font-family: Georgia, serif;
    font-size: 16px;
    line-height: 1.5;
    color: #949393;
  }

  &__form {
    width: 100%;

    :deep(.n-form-item-label) {
      font-family: Georgia, serif;
      font-size: 14px;
      color: #cccccc;
    }

    :deep(.n-input) {
      --n-height: 48px !important;
      --n-color: transparent !important;
      --n-color-focus: transparent !important;
      --n-border: 1px solid #636363 !important;
      --n-border-hover: 1px solid #ffffff !important;
      --n-border-focus: 1px solid #ffffff !important;
      --n-text-color: #ffffff !important;
      --n-placeholder-color: #777777 !important;
      --n-caret-color: #ffffff !important;
      --n-border-radius: 0 !important;
    }

    :deep(.n-checkbox) {
      --n-text-color: #949393 !important;
      --n-color-checked: #ed1515 !important;
      --n-border-checked: 1px solid #ed1515 !important;
      --n-check-mark-color: #ffffff !important;
    }
  }

  &__options {
    display: flex;
    justify-content: flex-end;
    margin: -4px 0 32px;
  }

  &__submit {
    min-height: 58px;
    font-family: "Oswald", sans-serif;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff;
    text-transform: uppercase;
    background-color: transparent;
    border: 2px solid #ffffff;
    border-radius: 0;

    &:hover,
    &:focus-visible {
      color: #ffffff;
      background-color: #ed1515;
      border-color: #ed1515;
    }
  }

  &__error {
    margin: 18px 0 0;
    font-family: Georgia, serif;
    font-size: 14px;
    color: #ed1515;
  }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 34px;
    font-family: Georgia, serif;
    font-size: 14px;
    color: #949393;
    text-decoration: none;

    &:hover,
    &:focus-visible {
      color: #ffffff;
      outline: none;
    }
  }

  &__image-wrapper {
    position: relative;
    min-width: 0;
    height: 100%;
    overflow: hidden;
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    filter: grayscale(1);
  }

  &__image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        rgba(23, 23, 23, 0.45),
        transparent 28%
    );
    pointer-events: none;
  }
}

/* Планшет */
@media (max-width: 1023px) {
  .admin-login {
    &__page {
      grid-template-columns: minmax(380px, 0.9fr) minmax(380px, 1fr);
    }

    &__content {
      padding: 50px 42px;
    }

    &__title {
      font-size: 44px;
    }
  }
}

/* Невысокий desktop */
@media (max-height: 800px) and (min-width: 768px) {
  .admin-login {
    &__language {
      top: 24px;
    }

    &__eyebrow {
      margin-bottom: 8px;
    }

    &__title {
      margin-bottom: 16px;
      font-size: 42px;
    }

    &__description {
      margin-bottom: 24px;
      font-size: 14px;
    }

    &__form {
      :deep(.n-form-item) {
        margin-bottom: 12px;
      }

      :deep(.n-input) {
        --n-height: 44px !important;
      }
    }

    &__options {
      margin-bottom: 20px;
    }

    &__submit {
      min-height: 50px;
    }

    &__back {
      margin-top: 20px;
    }
  }
}

/* Телефон */
@media (max-width: 767px) {
  .admin-login {
    height: 100dvh;

    &__page {
      display: grid;
      grid-template-rows: minmax(0, 1fr) 180px;
      grid-template-columns: 1fr;
      width: 100%;
      height: 100%;
    }

    &__content {
      grid-row: 1;
      align-items: center;
      height: 100%;
      padding: 50px 24px 24px;
    }

    &__language {
      top: 16px;
      right: 24px;
    }

    &__language-button {
      font-size: 12px;
    }

    &__form-wrapper {
      max-width: none;
    }

    &__eyebrow {
      margin-bottom: 8px;
      font-size: 13px;
    }

    &__title {
      margin-bottom: 14px;
      font-size: 30px;
    }

    &__description {
      margin-bottom: 20px;
      font-size: 13px;
    }

    &__form {
      :deep(.n-form-item) {
        margin-bottom: 10px;
      }

      :deep(.n-form-item-label) {
        font-size: 12px;
      }

      :deep(.n-input) {
        --n-height: 42px !important;
      }
    }

    &__options {
      margin-bottom: 18px;
    }

    &__submit {
      min-height: 48px;
      font-size: 15px;
    }

    &__back {
      margin-top: 18px;
      font-size: 13px;
    }

    &__image-wrapper {
      grid-row: 2;
      width: 100%;
      height: 180px;
      min-height: 0;
    }

    &__image {
      width: 100%;
      height: 100%;
      min-height: 0;
      object-position: center 25%;
    }

    &__image-overlay {
      background: linear-gradient(
          0deg,
          transparent,
          rgba(23, 23, 23, 0.35)
      );
    }
  }
}

/* Очень узкий телефон */
@media (max-width: 374px) {
  .admin-login {
    &__page {
      grid-template-rows: minmax(0, 1fr) 140px;
    }

    &__content {
      padding: 44px 18px 18px;
    }

    &__language {
      top: 12px;
      right: 18px;
    }

    &__title {
      font-size: 27px;
    }

    &__description {
      margin-bottom: 14px;
      font-size: 12px;
    }

    &__form {
      :deep(.n-input) {
        --n-height: 38px !important;
      }
    }

    &__options {
      margin-bottom: 12px;
    }

    &__submit {
      min-height: 44px;
    }

    &__back {
      margin-top: 12px;
    }

    &__image-wrapper {
      height: 140px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .admin-login *,
  .admin-login *::before,
  .admin-login *::after {
    transition: none;
  }
}
</style>
