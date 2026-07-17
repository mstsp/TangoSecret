<template>
  <section class="details section">
    <div class="container">
      <h2 class="details__heading section__title">
        {{ content.title }}
      </h2>

      <div class="details__cards">
        <article
          v-for="card in content.cards"
          :key="card.id"
          class="details__card"
        >
          <span
            class="details__card-icon"
            :class="card.icon"
            aria-hidden="true"
          />

          <h3 class="details__card-title">
            {{ card.title }}
          </h3>

          <p class="details__card-description">
            {{ card.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

type Language = "uk" | "ru" | "en";

interface Props {
  language?: Language;
}

interface DetailsCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface DetailsContent {
  title: string;
  cards: DetailsCard[];
}

const props = withDefaults(defineProps<Props>(), {
  language: "uk",
});

const translations: Record<Language, DetailsContent> = {
  uk: {
    title: "Танго під силу кожному",
    cards: [
      {
        id: "age",
        icon: "icon-high-heeled-shoes",
        title: "Вік",
        description:
          "Танго танцюють у будь-якому віці. Вам 25, 45 чи 55? Неважливо.",
      },
      {
        id: "interest",
        icon: "icon-point-of-interest",
        title: "Інтерес",
        description:
          "Ми допомагаємо людям зробити життя цікавішим і насиченішим емоціями за допомогою танго.",
      },
      {
        id: "style",
        icon: "icon-stylelint",
        title: "Стиль",
        description:
          "Ми хочемо навчити вас не просто танцю, а способу життя. Танго об’єднує людей.",
      },
      {
        id: "care",
        icon: "icon-airline-passenger-care",
        title: "Турбота",
        description:
          "Ми хочемо, щоб люди були уважнішими до партнера та вміли слухати себе.",
      },
    ],
  },

  ru: {
    title: "Танго по силам каждому",
    cards: [
      {
        id: "age",
        icon: "icon-high-heeled-shoes",
        title: "Возраст",
        description:
          "Танго танцуют в любом возрасте. Вам 25, 45 или 55? Неважно.",
      },
      {
        id: "interest",
        icon: "icon-point-of-interest",
        title: "Интерес",
        description:
          "Мы помогаем людям сделать жизнь интереснее и насыщеннее эмоциями с помощью танго.",
      },
      {
        id: "style",
        icon: "icon-stylelint",
        title: "Стиль",
        description:
          "Мы хотим научить вас не просто танцу, а образу жизни. Танго объединяет людей.",
      },
      {
        id: "care",
        icon: "icon-airline-passenger-care",
        title: "Внимание",
        description:
          "Мы хотим, чтобы люди были внимательнее к партнёру и умели слушать себя.",
      },
    ],
  },

  en: {
    title: "Tango is for everyone",
    cards: [
      {
        id: "age",
        icon: "icon-high-heeled-shoes",
        title: "Age",
        description:
          "People dance tango at every age. Whether you are 25, 45 or 55, it does not matter.",
      },
      {
        id: "interest",
        icon: "icon-point-of-interest",
        title: "Interest",
        description:
          "Tango helps people make their lives more interesting, expressive and full of emotion.",
      },
      {
        id: "style",
        icon: "icon-stylelint",
        title: "Style",
        description:
          "We want to teach you more than a dance. Tango is a lifestyle that brings people together.",
      },
      {
        id: "care",
        icon: "icon-airline-passenger-care",
        title: "Care",
        description:
          "We want people to become more attentive to their partners and learn to listen to themselves.",
      },
    ],
  },
};

const content = computed<DetailsContent>(
  () => translations[props.language],
);
</script>

<style lang="scss" scoped>
.details {
  padding-block: 100px;
  color: #ffffff;

  &__heading {
    margin: 0 0 64px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 48px 32px;
    width: 100%;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    text-align: center;
  }

  &__card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 70px;
    margin-bottom: 18px;
    font-size: 60px;
    line-height: 1;
    color: #ffffff;
    transition:
      color 0.25s ease,
      transform 0.3s ease;
  }

  &__card-title {
    margin: 0 0 20px;
    font-family: "Oswald", sans-serif;
    font-size: 30px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  &__card-description {
    width: 100%;
    max-width: 280px;
    margin: 0;
    font-family: Georgia, serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0.02em;
  }

  &__card:hover {
    .details__card-icon {
      color: #ed1515;
      transform: translateY(-5px);
    }
  }
}

/* Небольшой desktop */
@media (max-width: 1199px) {
  .details {
    padding-block: 80px;

    &__heading {
      margin-bottom: 54px;
    }

    &__cards {
      gap: 48px 24px;
    }

    &__card-icon {
      font-size: 54px;
    }

    &__card-title {
      font-size: 26px;
    }

    &__card-description {
      font-size: 16px;
    }
  }
}

/* Планшет: две карточки в строке */
@media (max-width: 899px) {
  .details {
    &__cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 56px 40px;
      max-width: 720px;
      margin-inline: auto;
    }

    &__card-description {
      max-width: 260px;
    }
  }
}

/* Телефон: сохраняем две колонки как в дизайне */
@media (max-width: 599px) {
  .details {
    padding-block: 64px;

    &__heading {
      margin-bottom: 44px;
    }

    &__cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 42px 18px;
    }

    &__card-icon {
      min-height: 52px;
      margin-bottom: 14px;
      font-size: 44px;
    }

    &__card-title {
      margin-bottom: 14px;
      font-size: 22px;
      line-height: 1.2;
    }

    &__card-description {
      max-width: 210px;
      font-size: 13px;
      line-height: 145%;
      letter-spacing: 0;
    }
  }
}

/* Узкий телефон */
@media (max-width: 359px) {
  .details {
    &__cards {
      grid-template-columns: 1fr;
      gap: 44px;
    }

    &__card-icon {
      font-size: 50px;
    }

    &__card-title {
      font-size: 24px;
    }

    &__card-description {
      max-width: 240px;
      font-size: 14px;
    }
  }
}

@media (hover: none) {
  .details {
    &__card:hover {
      .details__card-icon {
        color: #ffffff;
        transform: none;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .details *,
  .details *::before,
  .details *::after {
    transition: none;
  }
}
</style>
