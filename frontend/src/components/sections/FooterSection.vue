<template>
  <footer id="contacts" class="footer">
    <div class="container">
      <div class="footer__main">
        <form class="footer__contact-form" @submit.prevent="submitForm">
          <h2 class="footer__form-title section__title">
            {{ content.contactForm.title }}
          </h2>

          <div class="footer__fields">
            <div class="footer__form-group">
              <input
                id="footer-name"
                v-model.trim="form.name"
                class="footer__input"
                type="text"
                name="name"
                autocomplete="name"
                required
                placeholder=" "
              />

              <label class="footer__label" for="footer-name">
                {{ content.contactForm.inputName }}
              </label>
            </div>

            <div class="footer__form-group">
              <input
                id="footer-phone"
                v-model.trim="form.phone"
                class="footer__input"
                type="tel"
                name="phone"
                autocomplete="tel"
                inputmode="tel"
                required
                placeholder=" "
              />

              <label class="footer__label" for="footer-phone">
                {{ content.contactForm.inputPhone }}
              </label>
            </div>
          </div>

          <button class="footer__submit" type="submit">
            <span>{{ content.contactForm.buttonTitle }}</span>
          </button>

          <p
            v-if="isSubmitted"
            class="footer__success-message"
            role="status"
          >
            {{ content.contactForm.successMessage }}
          </p>
        </form>

        <div class="footer__contacts">
          <h2 class="footer__contacts-title">
            {{ content.contacts.title }}
          </h2>

          <div class="footer__contacts-grid">
            <div class="footer__address">
              <h3 class="footer__subtitle">
                {{ content.contacts.address.title }}
              </h3>

              <div class="footer__address-list">
                <p class="footer__contact-text">
                  {{ content.contacts.address.subtitle }}
                </p>

                <address class="footer__contact-text">
                  {{ content.contacts.address.street }}
                </address>

                <a
                  class="footer__contact-link"
                  :href="`mailto:${contactInformation.email}`"
                >
                  {{ contactInformation.email }}
                </a>

                <a
                  v-for="phone in contactInformation.phones"
                  :key="phone.label"
                  class="footer__contact-link"
                  :href="`tel:${phone.value}`"
                >
                  {{ phone.label }}
                </a>
              </div>
            </div>

            <div class="footer__socials">
              <h3 class="footer__subtitle">
                {{ content.contacts.socialMediaTitle }}
              </h3>

              <ul class="footer__socials-list">
                <li
                  v-for="social in socialMedia"
                  :key="social.name"
                  class="footer__social-item"
                >
                  <a
                    class="footer__social-link"
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="social.name"
                  >
                    <span>{{ social.name }}</span>

                    <svg
                      v-if="social.icon === 'facebook'"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.5 22v-9h3l.45-3.5H13.5V7.26c0-1.01.28-1.7 1.74-1.7H17.1V2.43A25 25 0 0 0 14.39 2C11.7 2 9.86 3.64 9.86 6.66V9.5H6.82V13h3.04v9h3.64Z"
                      />
                    </svg>

                    <svg
                      v-else-if="social.icon === 'youtube'"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.55 3.58 12 3.58 12 3.58s-7.55 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.85.5 9.4.5 9.4.5s7.55 0 9.4-.5a3 3 0 0 0 2.1-2.12A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.55 15.6V8.4L15.82 12 9.55 15.6Z"
                      />
                    </svg>

                    <svg
                      v-else
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.18 2A3.02 3.02 0 0 0 4 7.02v9.96A3.02 3.02 0 0 0 7.02 20h9.96A3.02 3.02 0 0 0 20 16.98V7.02A3.02 3.02 0 0 0 16.98 4H7.02ZM17.5 5.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__rights">
          {{ content.rights }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

type Language = "uk" | "ru" | "en";

interface Props {
  language?: Language;
}

interface FormData {
  name: string;
  phone: string;
}

interface Phone {
  label: string;
  value: string;
}

interface SocialMedia {
  name: string;
  icon: "facebook" | "youtube" | "instagram";
  url: string;
}

interface FooterContent {
  contactForm: {
    title: string;
    inputName: string;
    inputPhone: string;
    buttonTitle: string;
    successMessage: string;
  };
  rights: string;
  contacts: {
    title: string;
    address: {
      title: string;
      subtitle: string;
      street: string;
    };
    socialMediaTitle: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  language: "uk",
});

const emit = defineEmits<{
  submit: [formData: FormData];
}>();

const form = reactive<FormData>({
  name: "",
  phone: "",
});

const isSubmitted = ref(false);

const texts: Record<Language, FooterContent> = {
  uk: {
    contactForm: {
      title: "Ми вам передзвонимо!",
      inputName: "Ім’я",
      inputPhone: "Телефон",
      buttonTitle: "Залишити заявку",
      successMessage: "Дякуємо! Ми зв’яжемося з вами найближчим часом.",
    },
    rights: "Tango Secret 2022. Всі права захищені.",
    contacts: {
      title: "Контакти",
      address: {
        title: "Адреса",
        subtitle: "Заняття відбуваються у центрі міста",
        street: "вул. Короленка, 3, м. Дніпро",
      },
      socialMediaTitle: "Соцмережі",
    },
  },

  ru: {
    contactForm: {
      title: "Мы вам перезвоним!",
      inputName: "Имя",
      inputPhone: "Телефон",
      buttonTitle: "Оставить заявку",
      successMessage: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    },
    rights: "Tango Secret 2022. Все права защищены.",
    contacts: {
      title: "Контакты",
      address: {
        title: "Адрес",
        subtitle: "Занятия проходят в центре города",
        street: "ул. Короленко, 3, г. Днепр",
      },
      socialMediaTitle: "Соцсети",
    },
  },

  en: {
    contactForm: {
      title: "We will call you back!",
      inputName: "Name",
      inputPhone: "Phone",
      buttonTitle: "Send request",
      successMessage: "Thank you! We will contact you shortly.",
    },
    rights: "Tango Secret 2022. All rights reserved.",
    contacts: {
      title: "Contacts",
      address: {
        title: "Address",
        subtitle: "Classes take place in the city centre",
        street: "3 Korolenka Street, Dnipro",
      },
      socialMediaTitle: "Social media",
    },
  },
};

const contactInformation: {
  email: string;
  phones: Phone[];
} = {
  email: "TangoSecret@gmail.com",
  phones: [
    {
      label: "+38 097 307 77 90",
      value: "+380973077790",
    },
    {
      label: "+38 050 758 15 10",
      value: "+380507581510",
    },
  ],
};

const socialMedia: SocialMedia[] = [
  {
    name: "Facebook",
    icon: "facebook",
    url: "https://www.facebook.com/tangosecretdnepr",
  },
  {
    name: "YouTube",
    icon: "youtube",

    // Позже можно заменить настоящей ссылкой.
    url: "https://www.youtube.com/",
  },
  {
    name: "Instagram",
    icon: "instagram",

    // Позже можно заменить настоящей ссылкой.
    url: "https://www.instagram.com/",
  },
];

const content = computed<FooterContent>(() => texts[props.language]);

const submitForm = (): void => {
  emit("submit", {
    name: form.name,
    phone: form.phone,
  });

  isSubmitted.value = true;
};
</script>

<style scoped lang="scss">
.footer {
  padding: 150px 0 0;
  color: #ffffff;
  background-color: #171717;

  &__main {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.35fr);
    gap: clamp(80px, 10vw, 180px);
    align-items: start;
  }

  &__contact-form,
  &__contacts {
    min-width: 0;
  }

  &__form-title {
    margin: 0 0 48px;
  }

  &__fields {
    width: 100%;
    max-width: 350px;
  }

  &__form-group {
    position: relative;

    & + & {
      margin-top: 26px;
    }
  }

  &__input {
    display: block;
    width: 100%;
    height: 40px;
    padding: 12px 0 6px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    color: #ffffff;
    caret-color: #ffffff;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #636363;
    border-radius: 0;
    outline: none;
    transition: border-color 0.25s ease;

    &:focus {
      border-color: #ffffff;
    }

    &:focus + .footer__label,
    &:not(:placeholder-shown) + .footer__label {
      top: -10px;
      font-size: 11px;
      color: #ffffff;
    }

    &:-webkit-autofill {
      box-shadow: 0 0 0 1000px #171717 inset;
      -webkit-text-fill-color: #ffffff;
    }
  }

  &__label {
    position: absolute;
    top: 11px;
    left: 0;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1;
    color: #949393;
    pointer-events: none;
    transition:
      top 0.2s ease,
      color 0.2s ease,
      font-size 0.2s ease;
  }

  &__submit {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 222px;
    min-height: 64px;
    margin-top: 44px;
    padding: 16px 24px;
    color: #ffffff;
    background: transparent;
    border: 2px solid #ffffff;
    cursor: pointer;
    transition:
      color 0.25s ease,
      border-color 0.25s ease,
      background-color 0.25s ease;

    /*
     * Декоративные разрывы рамки как в макете.
     */
    &::before,
    &::after {
      position: absolute;
      width: 16px;
      height: 8px;
      content: "";
      background-color: #171717;
    }

    &::before {
      top: -4px;
      right: 20px;
    }

    &::after {
      bottom: -4px;
      left: 20px;
    }

    span {
      position: relative;
      z-index: 1;
      font-family: "Oswald", sans-serif;
      font-size: 16px;
      font-weight: 500;
      line-height: 1;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    &:hover,
    &:focus-visible {
      color: #171717;
      background-color: #ffffff;
      outline: none;

      &::before,
      &::after {
        background-color: #ffffff;
      }
    }
  }

  &__success-message {
    max-width: 350px;
    margin: 20px 0 0;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    color: #ffffff;
  }

  &__contacts-title {
    margin: 4px 0 43px;
    font-family: "Oswald", sans-serif;
    font-size: 30px;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;
  }

  &__contacts-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(150px, 0.7fr);
    gap: clamp(50px, 7vw, 110px);
  }

  &__subtitle {
    margin: 0 0 20px;
    font-family: Arial, sans-serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.3;
  }

  &__address-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 9px;
  }

  &__contact-text,
  &__contact-link {
    margin: 0;
    font-family: Arial, sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.35;
    color: #949393;
    font-style: normal;
  }

  &__contact-link {
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover,
    &:focus-visible {
      color: #ffffff;
      outline: none;
    }
  }

  &__socials-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__social-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.2;
    color: #949393;
    text-decoration: none;
    transition: color 0.2s ease;

    svg {
      flex: 0 0 auto;
      width: 19px;
      height: 19px;
      fill: currentColor;
    }

    &:hover,
    &:focus-visible {
      color: #ffffff;
      outline: none;
    }
  }

  &__bottom {
    margin-top: 95px;
    padding: 28px 0 72px;
    border-top: 1px solid #636363;
  }

  &__rights {
    margin: 0;
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.4;
    color: #949393;
  }
}

/* Планшет */
@media (max-width: 1023px) {
  .footer {
    padding-top: 110px;

    &__main {
      grid-template-columns: 1fr;
      gap: 80px;
    }

    &__fields {
      max-width: 420px;
    }

    &__contacts-title {
      margin-bottom: 36px;
    }

    &__contacts-grid {
      grid-template-columns: minmax(0, 1fr) minmax(180px, 0.7fr);
      gap: 60px;
      max-width: 700px;
    }

    &__bottom {
      margin-top: 70px;
      padding-bottom: 48px;
    }
  }
}

/* Большой телефон */
@media (max-width: 599px) {
  .footer {
    padding-top: 80px;

    &__main {
      gap: 68px;
    }

    &__form-title {
      margin-bottom: 38px;
    }

    &__fields {
      max-width: none;
    }

    &__submit {
      width: 222px;
      margin-top: 40px;
    }

    &__contacts-title {
      margin: 0 0 32px;
      font-size: 27px;
    }

    &__contacts-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px;
    }

    &__subtitle {
      font-size: 18px;
    }

    &__contact-text,
    &__contact-link,
    &__social-link {
      font-size: 14px;
    }

    &__bottom {
      margin-top: 56px;
      padding: 18px 0 28px;
    }

    &__rights {
      font-size: 13px;
      font-style: italic;
    }
  }
}

/* Узкий телефон */
@media (max-width: 374px) {
  .footer {
    padding-top: 64px;

    &__main {
      gap: 64px;
    }

    &__submit {
      width: 100%;
    }

    &__contacts-grid {
      grid-template-columns: 1fr;
      gap: 28px;
    }

    &__socials-list {
      gap: 10px;
    }

    &__bottom {
      margin-top: 48px;
    }

    &__rights {
      font-size: 12px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .footer *,
  .footer *::before,
  .footer *::after {
    transition: none;
  }
}
</style>
