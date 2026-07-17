<template>
  <header
    class="header"
    :class="{
      'header--scrolled': isScrolled,
      'header--menu-open': isMenuOpen,
    }"
  >
    <a
      class="header__logo-link"
      href="#hero"
      aria-label="Tango Secret"
      @click="closeMenu"
    >
      <img
        class="header__logo"
        src="../../assets/images/logo.svg"
        alt="Tango Secret"
      />
    </a>

    <div class="header__menu-nav">
      <nav
        class="header__nav"
        :class="{ 'header__nav--open': isMenuOpen }"
        :aria-label="translations.navigationLabel"
      >
        <ul class="header__menu">
          <li
            v-for="item in translations.menu"
            :key="item.id"
            class="header__menu-item"
          >
            <a :href="item.href" @click="closeMenu">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>

      <div
        ref="languageDropdownRef"
        class="header__language-dropdown"
      >
        <button
          class="header__language-trigger"
          type="button"
          :aria-expanded="isLanguageDropdownOpen"
          :aria-label="translations.languageLabel"
          aria-haspopup="listbox"
          @click="toggleLanguageDropdown"
          @keydown.esc="closeLanguageDropdown"
        >
          <svg
            class="header__language-globe"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path
              d="M12 3c2.4 2.45 3.6 5.45 3.6 9s-1.2 6.55-3.6 9"
            />
            <path
              d="M12 3c-2.4 2.45-3.6 5.45-3.6 9s1.2 6.55 3.6 9"
            />
          </svg>

          <span class="header__language-current">
            {{ selectedLanguage.short }}
          </span>

          <svg
            class="header__language-arrow"
            :class="{
              'header__language-arrow--open':
                isLanguageDropdownOpen,
            }"
            viewBox="0 0 12 8"
            aria-hidden="true"
          >
            <path d="M1 1.5 6 6.5l5-5" />
          </svg>
        </button>

        <transition name="language-dropdown">
          <ul
            v-if="isLanguageDropdownOpen"
            class="header__language-menu"
            role="listbox"
            :aria-label="translations.languageLabel"
          >
            <li
              v-for="language in languages"
              :key="language.value"
              class="header__language-item"
              role="option"
              :aria-selected="
                language.value === currentLanguage
              "
            >
              <button
                class="header__language-option"
                :class="{
                  'header__language-option--active':
                    language.value === currentLanguage,
                }"
                type="button"
                @click="setLanguage(language.value)"
              >
                <span class="header__language-name">
                  {{ language.label }}
                </span>

                <strong class="header__language-short">
                  {{ language.short }}
                </strong>

                <svg
                  v-if="language.value === currentLanguage"
                  class="header__language-check"
                  viewBox="0 0 12 10"
                  aria-hidden="true"
                >
                  <path d="m1 5 3 3 7-7" />
                </svg>
              </button>
            </li>
          </ul>
        </transition>
      </div>

      <button
        class="header__icon-burger"
        :class="{
          'header__icon-burger--open': isMenuOpen,
        }"
        type="button"
        :aria-expanded="isMenuOpen"
        :aria-label="
          isMenuOpen
            ? translations.closeMenuButtonLabel
            : translations.menuButtonLabel
        "
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";

type Language = "uk" | "ru" | "en";

interface LanguageItem {
  label: string;
  value: Language;
  short: "UK" | "RU" | "EN";
}

interface MenuItem {
  id: string;
  title: string;
  href: string;
}

interface HeaderTranslations {
  navigationLabel: string;
  languageLabel: string;
  menuButtonLabel: string;
  closeMenuButtonLabel: string;
  menu: MenuItem[];
}

const currentLanguage = ref<Language>("uk");
const isMenuOpen = ref(false);
const isLanguageDropdownOpen = ref(false);
const isScrolled = ref(false);

const languageDropdownRef = ref<HTMLElement | null>(null);

const languages: LanguageItem[] = [
  {
    label: "Українська",
    value: "uk",
    short: "UK",
  },
  {
    label: "English",
    value: "en",
    short: "EN",
  },
  {
    label: "Русский",
    value: "ru",
    short: "RU",
  },
];

const translationsData: Record<
  Language,
  HeaderTranslations
> = {
  uk: {
    navigationLabel: "Головна навігація",
    languageLabel: "Вибір мови",
    menuButtonLabel: "Відкрити меню",
    closeMenuButtonLabel: "Закрити меню",
    menu: [
      {
        id: "about",
        title: "Про нас",
        href: "#about",
      },
      {
        id: "schedule",
        title: "Розклад",
        href: "#schedule",
      },
      {
        id: "pricing",
        title: "Ціни",
        href: "#pricing",
      },
      {
        id: "faq",
        title: "Запитання",
        href: "#faq",
      },
      {
        id: "contacts",
        title: "Контакти",
        href: "#contacts",
      },
    ],
  },

  ru: {
    navigationLabel: "Главная навигация",
    languageLabel: "Выбор языка",
    menuButtonLabel: "Открыть меню",
    closeMenuButtonLabel: "Закрыть меню",
    menu: [
      {
        id: "about",
        title: "О нас",
        href: "#about",
      },
      {
        id: "schedule",
        title: "Расписание",
        href: "#schedule",
      },
      {
        id: "pricing",
        title: "Цены",
        href: "#pricing",
      },
      {
        id: "faq",
        title: "Вопросы",
        href: "#faq",
      },
      {
        id: "contacts",
        title: "Контакты",
        href: "#contacts",
      },
    ],
  },

  en: {
    navigationLabel: "Main navigation",
    languageLabel: "Language selection",
    menuButtonLabel: "Open menu",
    closeMenuButtonLabel: "Close menu",
    menu: [
      {
        id: "about",
        title: "About",
        href: "#about",
      },
      {
        id: "schedule",
        title: "Schedule",
        href: "#schedule",
      },
      {
        id: "pricing",
        title: "Pricing",
        href: "#pricing",
      },
      {
        id: "faq",
        title: "FAQ",
        href: "#faq",
      },
      {
        id: "contacts",
        title: "Contacts",
        href: "#contacts",
      },
    ],
  },
};

const translations = computed(
  () => translationsData[currentLanguage.value],
);

const selectedLanguage = computed<LanguageItem>(() => {
  return (
    languages.find(
      (language) =>
        language.value === currentLanguage.value,
    ) ?? languages[0]
  );
});

const handleScroll = (): void => {
  isScrolled.value = window.scrollY > 20;
};

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
  closeLanguageDropdown();
};

const closeMenu = (): void => {
  isMenuOpen.value = false;
};

const toggleLanguageDropdown = (): void => {
  isLanguageDropdownOpen.value =
    !isLanguageDropdownOpen.value;
};

const closeLanguageDropdown = (): void => {
  isLanguageDropdownOpen.value = false;
};

const setLanguage = (language: Language): void => {
  currentLanguage.value = language;
  closeLanguageDropdown();
};

const handleClickOutside = (event: MouseEvent): void => {
  const target = event.target;

  if (
    target instanceof Node &&
    languageDropdownRef.value &&
    !languageDropdownRef.value.contains(target)
  ) {
    closeLanguageDropdown();
  }
};

const handleEscape = (event: KeyboardEvent): void => {
  if (event.key !== "Escape") {
    return;
  }

  closeMenu();
  closeLanguageDropdown();
};

onMounted(() => {
  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener(
    "click",
    handleClickOutside,
  );
  document.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 12px 20px;
  color: #ffffff;
  transform: translateX(-50%);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    z-index: -1;
    width: 100vw;
    border-bottom: 1px solid transparent;
    background-color: transparent;
    transform: translateX(-50%);
    transition:
      background-color 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease,
      backdrop-filter 0.3s ease;
  }
}

.header--scrolled::before,
.header--menu-open::before {
  border-bottom-color: rgba(255, 255, 255, 0.08);
  background-color: rgba(23, 23, 23, 0.68);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.header__logo-link {
  position: relative;
  z-index: 103;
  display: block;
  flex-shrink: 0;
}

.header__logo {
  display: block;
}

.header__menu-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 798px;
  padding-top: 8px;
  padding-right: 33px;
  padding-left: 28px;
  font-family: "Oswald Medium", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 7%;
}

.header__menu {
  display: flex;
}

.header__menu-item {
  position: relative;
  margin: 0 25px;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;

  a {
    display: block;
    color: inherit;
    background: transparent;
    text-decoration: none;
  }

  a::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    margin: auto;
    background-color: transparent;
    transition: width 0.3s ease;
  }

  a:hover::after,
  a:focus-visible::after {
    width: 100%;
    background-color: #ed1515;
    box-shadow: 0 0 4px 1px #ed1515;
  }
}

.header__language-dropdown {
  position: relative;
  z-index: 104;
  flex-shrink: 0;
}

.header__language-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 82px;
  padding: 8px 10px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  user-select: none;

  &:hover,
  &:focus-visible {
    color: #ed1515;
  }

  &:focus-visible {
    outline: 1px solid #ed1515;
    outline-offset: 3px;
  }
}

.header__language-globe {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.header__language-current {
  min-width: 22px;
  text-align: left;
}

.header__language-arrow {
  width: 10px;
  height: 7px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.25s ease;
}

.header__language-arrow--open {
  transform: rotate(180deg);
}

.header__language-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 150;
  width: 190px;
  overflow: hidden;
  padding: 8px 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-color: rgba(32, 32, 32, 0.92);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.header__language-item {
  margin: 0;
  padding: 0;
  border: 0;
}

.header__language-option {
  display: grid;
  grid-template-columns: 1fr auto 14px;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 11px 14px;
  border: 0;
  background: transparent;
  color: #ffffff;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover,
  &:focus-visible {
    background-color: rgba(255, 255, 255, 0.08);
    color: #ed1515;
    outline: none;
  }
}

.header__language-option--active {
  color: #ed1515;
}

.header__language-name {
  white-space: nowrap;
}

.header__language-short {
  font-weight: 500;
}

.header__language-check {
  width: 12px;
  height: 10px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.header__icon-burger {
  position: relative;
  z-index: 104;
  display: none;
  width: 26px;
  height: 20px;
  margin-left: 30px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #ffffff;
  cursor: pointer;

  span {
    position: absolute;
    left: 0;
    display: block;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transition:
      top 0.3s ease,
      transform 0.3s ease,
      opacity 0.3s ease;
  }

  span:nth-child(1) {
    top: 1px;
  }

  span:nth-child(2) {
    top: 9px;
  }

  span:nth-child(3) {
    top: 17px;
  }
}

.header__icon-burger--open {
  span:nth-child(1) {
    top: 9px;
    transform: rotate(45deg);
  }

  span:nth-child(2) {
    opacity: 0;
  }

  span:nth-child(3) {
    top: 9px;
    transform: rotate(-45deg);
  }
}

.language-dropdown-enter-active,
.language-dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform-origin: top right;
}

.language-dropdown-enter-from,
.language-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

@media (max-width: 1200px) {
  .header__menu-nav {
    justify-content: flex-end;
    padding-right: 0;
    padding-left: 0;
  }

  .header__nav {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 102;
    display: flex;
    width: min(420px, 100%);
    height: 100vh;
    padding: 105px 40px 40px;
    background-color: rgba(23, 23, 23, 0.94);
    visibility: hidden;
    transform: translateX(100%);
    transition:
      transform 0.3s ease,
      visibility 0.3s ease;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .header__nav--open {
    visibility: visible;
    transform: translateX(0);
  }

  .header__menu {
    flex-direction: column;
    width: 100%;
  }

  .header__menu-item {
    width: 100%;
    margin: 0;
    border-bottom: 1px solid
    rgba(255, 255, 255, 0.15);

    a {
      padding: 18px 0;
    }

    a::after {
      margin: 0;
    }
  }

  .header__icon-burger {
    display: block;
  }
}

@media (max-width: 640px) {
  .header {
    padding: 12px 16px;
  }

  .header__nav {
    width: 100%;
    padding: 100px 24px 40px;
  }

  .header__language-trigger {
    min-width: auto;
    padding-right: 4px;
    padding-left: 4px;
  }

  .header__language-menu {
    right: -35px;
    width: 180px;
  }

  .header__icon-burger {
    margin-left: 20px;
  }
}
</style>
