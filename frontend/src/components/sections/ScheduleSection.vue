<template>
  <section id="schedule" class="schedule section">
    <div class="container">
      <h2 class="schedule__heading section__title">
        {{ translations[currentLanguage].title }}
      </h2>

      <div class="schedule__list">
        <article
          v-for="(scheduleItem, index) in schedule"
          :key="scheduleItem.id"
          class="schedule__row"
          :class="{
            'schedule__row--reversed': index % 2 !== 0,
          }"
        >
          <div class="schedule__content">
            <div class="schedule__content-inner">
              <div class="schedule__name-row">
                <h3 class="schedule__title">
                  {{ scheduleItem.content[currentLanguage].title }}
                </h3>

                <span
                  v-if="scheduleItem.content[currentLanguage].description"
                  class="schedule__subtitle"
                >
                  ({{
                    scheduleItem.content[currentLanguage].description
                  }})
                </span>
              </div>

              <div class="schedule__times">
                <div
                  v-for="(timeItem, timeIndex) in scheduleItem.content[
                    currentLanguage
                  ].times"
                  :key="`${scheduleItem.id}-${timeIndex}`"
                  class="schedule__time-row"
                >
                  <span class="schedule__day">
                    {{ timeItem.day }}
                  </span>

                  <time class="schedule__time">
                    {{ timeItem.time }}
                  </time>
                </div>
              </div>
            </div>
          </div>

          <div class="schedule__image-wrapper">
            <img
              class="schedule__image"
              :src="scheduleItem.image"
              :alt="scheduleItem.content[currentLanguage].imageAlt"
              loading="lazy"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import day1 from "@/assets/images/schedule/day-1.png";
import day2 from "@/assets/images/schedule/day-2.png";
import day3 from "@/assets/images/schedule/day-3.png";
import day4 from "@/assets/images/schedule/day-4.png";
import day5 from "@/assets/images/schedule/day-5.png";
import day6 from "@/assets/images/schedule/day-6.png";

type Language = "uk" | "ru" | "en";

interface Props {
  language?: Language;
}

interface ScheduleTime {
  day: string;
  time: string;
}

interface ScheduleContent {
  title: string;
  description: string;
  imageAlt: string;
  times: ScheduleTime[];
}

interface ScheduleItem {
  id: number;
  image: string;
  content: Record<Language, ScheduleContent>;
}

const props = withDefaults(defineProps<Props>(), {
  language: "uk",
});

const currentLanguage = computed<Language>(() => props.language);

const translations: Record<Language, { title: string }> = {
  uk: {
    title: "Наш розклад",
  },
  ru: {
    title: "Наше расписание",
  },
  en: {
    title: "Our schedule",
  },
};

const schedule: ScheduleItem[] = [
  {
    id: 1,
    image: day1,

    content: {
      uk: {
        title: "Початківці",
        description: "зміна пар",
        imageAlt: "Заняття для початківців у школі танго",
        times: [
          {
            day: "Вівторок",
            time: "19:00 — 21:20",
          },
          {
            day: "Субота",
            time: "14:00 — 15:20",
          },
        ],
      },

      ru: {
        title: "Начинающие",
        description: "смена пар",
        imageAlt: "Занятие для начинающих в школе танго",
        times: [
          {
            day: "Вторник",
            time: "19:00 — 21:20",
          },
          {
            day: "Суббота",
            time: "14:00 — 15:20",
          },
        ],
      },

      en: {
        title: "Beginners",
        description: "partner rotation",
        imageAlt: "Beginner class at the tango school",
        times: [
          {
            day: "Tuesday",
            time: "19:00 — 21:20",
          },
          {
            day: "Saturday",
            time: "14:00 — 15:20",
          },
        ],
      },
    },
  },
  {
    id: 2,
    image: day2,

    content: {
      uk: {
        title: "Середня група",
        description: "зміна пар",
        imageAlt: "Заняття середньої групи з аргентинського танго",
        times: [
          {
            day: "Вівторок",
            time: "21:30 — 21:50",
          },
          {
            day: "Субота",
            time: "18:00 — 19:20",
          },
        ],
      },

      ru: {
        title: "Продолжающие",
        description: "смена пар",
        imageAlt: "Занятие продолжающей группы по аргентинскому танго",
        times: [
          {
            day: "Вторник",
            time: "21:30 — 21:50",
          },
          {
            day: "Суббота",
            time: "18:00 — 19:20",
          },
        ],
      },

      en: {
        title: "Intermediate group",
        description: "partner rotation",
        imageAlt: "Intermediate Argentine tango class",
        times: [
          {
            day: "Tuesday",
            time: "21:30 — 21:50",
          },
          {
            day: "Saturday",
            time: "18:00 — 19:20",
          },
        ],
      },
    },
  },
  {
    id: 3,
    image: day3,

    content: {
      uk: {
        title: "Тематичне заняття",
        description: "без зміни пар",
        imageAlt: "Тематичне заняття з аргентинського танго",
        times: [
          {
            day: "Середа",
            time: "19:00 — 20:20",
          },
          {
            day: "Субота",
            time: "19:30 — 20:50",
          },
        ],
      },

      ru: {
        title: "Тематическое занятие",
        description: "без смены пар",
        imageAlt: "Тематическое занятие по аргентинскому танго",
        times: [
          {
            day: "Среда",
            time: "19:00 — 20:20",
          },
          {
            day: "Суббота",
            time: "19:30 — 20:50",
          },
        ],
      },

      en: {
        title: "Themed class",
        description: "no partner rotation",
        imageAlt: "Themed Argentine tango class",
        times: [
          {
            day: "Wednesday",
            time: "19:00 — 20:20",
          },
          {
            day: "Saturday",
            time: "19:30 — 20:50",
          },
        ],
      },
    },
  },
  {
    id: 4,
    image: day4,

    content: {
      uk: {
        title: "Escenario",
        description: "без зміни пар",
        imageAlt: "Заняття з танго Escenario",
        times: [
          {
            day: "Середа",
            time: "20:30 — 21:50",
          },
        ],
      },

      ru: {
        title: "Escenario",
        description: "без смены пар",
        imageAlt: "Занятие по танго Escenario",
        times: [
          {
            day: "Среда",
            time: "20:30 — 21:50",
          },
        ],
      },

      en: {
        title: "Escenario",
        description: "no partner rotation",
        imageAlt: "Tango Escenario class",
        times: [
          {
            day: "Wednesday",
            time: "20:30 — 21:50",
          },
        ],
      },
    },
  },
  {
    id: 5,
    image: day5,

    content: {
      uk: {
        title: "Практика",
        description: "",
        imageAlt: "Практика з аргентинського танго",
        times: [
          {
            day: "Субота",
            time: "20:30 — 21:50",
          },
        ],
      },

      ru: {
        title: "Практика",
        description: "",
        imageAlt: "Практика по аргентинскому танго",
        times: [
          {
            day: "Суббота",
            time: "20:30 — 21:50",
          },
        ],
      },

      en: {
        title: "Practice",
        description: "",
        imageAlt: "Argentine tango practice",
        times: [
          {
            day: "Saturday",
            time: "20:30 — 21:50",
          },
        ],
      },
    },
  },
  {
    id: 6,
    image: day6,

    content: {
      uk: {
        title: "Мілонга",
        description: "танцювальна вечірка",
        imageAlt: "Мілонга у школі аргентинського танго",
        times: [
          {
            day: "Субота",
            time: "За оголошенням",
          },
        ],
      },

      ru: {
        title: "Милонга",
        description: "танцевальная вечеринка",
        imageAlt: "Милонга в школе аргентинского танго",
        times: [
          {
            day: "Суббота",
            time: "По объявлению",
          },
        ],
      },

      en: {
        title: "Milonga",
        description: "tango party",
        imageAlt: "Milonga at the Argentine tango school",
        times: [
          {
            day: "Saturday",
            time: "To be announced",
          },
        ],
      },
    },
  },
];
</script>

<style scoped lang="scss">
.schedule {
  padding-block: 100px;
  color: #ffffff;

  &__heading {
    margin-bottom: 64px;
  }

  &__list {
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    min-height: 285px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);

    &--reversed {
      .schedule__content {
        order: 2;
      }

      .schedule__image-wrapper {
        order: 1;
      }
    }
  }

  &__content {
    display: flex;
    align-items: center;
    min-width: 0;
    padding: 40px 48px;
  }

  &__content-inner {
    width: 100%;
    max-width: 420px;
  }

  &__name-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 5px;
    margin-bottom: 24px;
  }

  &__title {
    margin: 0;
    font-family: "Oswald", sans-serif;
    font-size: 26px;
    font-weight: 500;
    line-height: 1.2;
  }

  &__subtitle {
    font-family: Georgia, serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
  }

  &__times {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  &__time-row {
    display: grid;
    grid-template-columns: minmax(110px, 0.6fr) minmax(130px, 1fr);
    align-items: baseline;
    gap: 16px;
  }

  &__day,
  &__time {
    font-family: Georgia, serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
  }

  &__time {
    color: inherit;
    white-space: nowrap;
  }

  &__image-wrapper {
    position: relative;
    min-width: 0;
    min-height: 285px;
    overflow: hidden;
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 285px;
    object-fit: cover;
    object-position: center;
    transition:
      transform 0.6s ease,
      filter 0.4s ease;
  }

  &__row:hover {
    .schedule__image {
      transform: scale(1.03);
      filter: brightness(0.85);
    }
  }
}

/* Небольшой desktop и большой планшет */
@media (max-width: 1199px) {
  .schedule {
    padding-block: 80px;

    &__heading {
      margin-bottom: 48px;
    }

    &__row {
      min-height: 240px;
    }

    &__content {
      padding: 32px;
    }

    &__title {
      font-size: 23px;
    }

    &__image-wrapper,
    &__image {
      min-height: 240px;
    }
  }
}

/* Планшет */
@media (max-width: 833px) {
  .schedule {
    &__row {
      grid-template-columns: 1fr;
      min-height: auto;

      &--reversed {
        .schedule__content,
        .schedule__image-wrapper {
          order: initial;
        }
      }
    }

    &__content {
      order: 1;
      min-height: 220px;
      padding: 36px 32px;
    }

    &__image-wrapper {
      order: 2;
      min-height: auto;
      aspect-ratio: 516 / 285;
    }

    &__image {
      min-height: 0;
    }

    &__content-inner {
      max-width: none;
    }
  }
}

/* Телефон */
@media (max-width: 599px) {
  .schedule {
    padding-block: 64px;

    &__heading {
      margin-bottom: 40px;
    }

    &__content {
      min-height: 190px;
      padding: 30px 20px;
    }

    &__name-row {
      gap: 4px;
      margin-bottom: 20px;
    }

    &__title {
      font-size: 21px;
    }

    &__subtitle {
      font-size: 12px;
    }

    &__times {
      gap: 12px;
    }

    &__time-row {
      grid-template-columns: minmax(90px, 0.7fr) minmax(125px, 1fr);
      gap: 12px;
    }

    &__day,
    &__time {
      font-size: 14px;
    }
  }
}

/* Очень узкие телефоны */
@media (max-width: 359px) {
  .schedule {
    &__content {
      padding-inline: 16px;
    }

    &__time-row {
      grid-template-columns: 1fr;
      gap: 2px;
    }

    &__time {
      white-space: normal;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .schedule__image {
    transition: none;
  }
}
</style>
