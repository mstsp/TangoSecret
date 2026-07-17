<template>
  <section id="teachers" class="teachers section">
    <div class="container">
      <h2 class="teachers__title section__title">
        {{ translations[currentLanguage].title }}
      </h2>

      <div class="teachers__cards">
        <article
          v-for="teacher in teachers"
          :key="teacher.id"
          class="teachers__card"
          :class="{
            'teachers__card--active': activeTeacherId === teacher.id,
          }"
          tabindex="0"
          :aria-label="teacher.content[currentLanguage].name"
          @click="toggleTeacher(teacher.id)"
          @keydown.enter.prevent="toggleTeacher(teacher.id)"
          @keydown.space.prevent="toggleTeacher(teacher.id)"
          @keydown.esc="closeTeacher"
        >
          <img
            class="teachers__photo"
            :src="teacher.photo"
            :alt="teacher.content[currentLanguage].name"
          />

          <div class="teachers__overlay">
            <div class="teachers__info">
              <div class="teachers__info-content">
                <h3 class="teachers__name">
                  {{ teacher.content[currentLanguage].name }}
                </h3>

                <p class="teachers__experience">
                  {{ teacher.content[currentLanguage].experience }}
                </p>
              </div>
            </div>

            <div class="teachers__description">
              <p class="teachers__description-text">
                {{ teacher.content[currentLanguage].description }}
              </p>

              <div class="teachers__socials">
                <a
                  v-if="teacher.facebook"
                  class="teachers__social-link"
                  :href="teacher.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`Facebook — ${
                    teacher.content[currentLanguage].name
                  }`"
                  @click.stop
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M13.5 22v-9h3l.45-3.5H13.5V7.26c0-1.01.28-1.7 1.74-1.7H17.1V2.43A25 25 0 0 0 14.39 2C11.7 2 9.86 3.64 9.86 6.66V9.5H6.82V13h3.04v9h3.64Z"
                    />
                  </svg>
                </a>

                <a
                  v-if="teacher.instagram"
                  class="teachers__social-link"
                  :href="teacher.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`Instagram — ${
                    teacher.content[currentLanguage].name
                  }`"
                  @click.stop
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.18 2A3.02 3.02 0 0 0 4 7.02v9.96A3.02 3.02 0 0 0 7.02 20h9.96A3.02 3.02 0 0 0 20 16.98V7.02A3.02 3.02 0 0 0 16.98 4H7.02ZM17.5 5.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="teachers__mobile-caption">
            <span class="teachers__mobile-arrow" aria-hidden="true" />

            <span class="teachers__mobile-name">
              {{ teacher.content[currentLanguage].name }}
            </span>

            <span class="teachers__mobile-divider">—</span>

            <span class="teachers__mobile-experience">
              {{ teacher.content[currentLanguage].experience }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import teacher1 from "@/assets/images/teachers/teacher-1.png";
import teacher2 from "@/assets/images/teachers/teacher-2.png";
import teacher3 from "@/assets/images/teachers/teacher-3.png";
import teacher4 from "@/assets/images/teachers/teacher-4.png";

type Language = "uk" | "ru" | "en";

interface Props {
  language?: Language;
}

interface TeacherContent {
  name: string;
  experience: string;
  description: string;
}

interface Teacher {
  id: number;
  photo: string;
  facebook?: string;
  instagram?: string;
  content: Record<Language, TeacherContent>;
}

const props = withDefaults(defineProps<Props>(), {
  language: "uk",
});

const currentLanguage = computed<Language>(() => props.language);

const activeTeacherId = ref<number | null>(null);

const toggleTeacher = (teacherId: number): void => {
  activeTeacherId.value =
    activeTeacherId.value === teacherId ? null : teacherId;
};

const closeTeacher = (): void => {
  activeTeacherId.value = null;
};

const translations: Record<Language, { title: string }> = {
  uk: {
    title: "Наші викладачі",
  },
  ru: {
    title: "Наши преподаватели",
  },
  en: {
    title: "Our teachers",
  },
};

const teachers: Teacher[] = [
  {
    id: 1,
    photo: teacher1,
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",

    content: {
      uk: {
        name: "Володимир Сапін",
        experience: "У світі танго з 2007 р.",
        description:
          "Для мене танго — це образ мислення, який відображає сильну сторону життя. Танець дозволяє мислити розмірено й упевнено, плануючи та відчуваючи навколишній світ.",
      },
      ru: {
        name: "Владимир Сапин",
        experience: "В мире танго с 2007 г.",
        description:
          "Для меня танго — это образ мышления, отражающий сильную сторону жизни. Танец позволяет мыслить размеренно и уверенно, планируя и чувствуя окружающий мир.",
      },
      en: {
        name: "Volodymyr Sapin",
        experience: "Dancing tango since 2007",
        description:
          "For me, tango is a way of thinking that reflects the strength of life. It teaches us to move confidently, plan ahead and feel the world around us.",
      },
    },
  },
  {
    id: 2,
    photo: teacher2,
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",

    content: {
      uk: {
        name: "Тетяна Косюченко",
        experience: "У світі танго з 2009 р.",
        description:
          "Ми навчаємо не просто танцювати танго, а розуміти його та отримувати насолоду. Якщо ти хоча б раз спробував танго, то одразу зрозумієш, що це — твоє. І назавжди.",
      },
      ru: {
        name: "Татьяна Косюченко",
        experience: "В мире танго с 2009 г.",
        description:
          "Мы учим не просто танцевать танго, а понимать его и получать удовольствие. Если ты хотя бы раз попробовал танго, то сразу поймёшь, что это твоё. И навсегда.",
      },
      en: {
        name: "Tetiana Kosiuchenko",
        experience: "Dancing tango since 2009",
        description:
          "We teach people not only to dance tango, but also to understand and enjoy it. Once you try tango, you immediately realise that it belongs in your life forever.",
      },
    },
  },
  {
    id: 3,
    photo: teacher3,
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",

    content: {
      uk: {
        name: "Тетяна Курбацька",
        experience: "У світі танго з 2016 р.",
        description:
          "Мені хотілося привнести до сімейного дозвілля щось нове, цікаве, те спільне, що дозволило б нам стати ще ближчими одне до одного. Але в танго ми знайшли набагато більше. Чи могла я тоді уявити, що танго захопить нас настільки, що ми будемо готові ділитися своїми знаннями з іншими?",
      },
      ru: {
        name: "Татьяна Курбацкая",
        experience: "В мире танго с 2016 г.",
        description:
          "Мне хотелось привнести в семейный досуг что-то новое и интересное, что позволило бы нам стать ещё ближе. Но в танго мы нашли намного больше. Могла ли я тогда представить, что танго увлечёт нас настолько, что мы захотим делиться своими знаниями с другими?",
      },
      en: {
        name: "Tetiana Kurbatska",
        experience: "Dancing tango since 2016",
        description:
          "I wanted to bring something new and exciting into our family life, something that would make us even closer. Tango gave us much more and inspired us to share our knowledge and experience with others.",
      },
    },
  },
  {
    id: 4,
    photo: teacher4,
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",

    content: {
      uk: {
        name: "Максим Саміленко",
        experience: "У світі танго з 2016 р.",
        description:
          "Під час відрядження до Аргентини мені пощастило побувати на танго-шоу та зробити перші кроки. Після цього танго надовго увійшло в моє життя. Я ділюся знаннями з учнями, використовуючи весь свій досвід. Головний девіз — розслабляємося та отримуємо задоволення!",
      },
      ru: {
        name: "Максим Самиленко",
        experience: "В мире танго с 2016 г.",
        description:
          "Во время командировки в Аргентину мне посчастливилось побывать на танго-шоу и сделать первые шаги. После этого танго надолго вошло в мою жизнь. Я делюсь знаниями с учениками, используя весь свой опыт. Главный девиз — расслабляемся и получаем удовольствие!",
      },
      en: {
        name: "Maksym Samilenko",
        experience: "Dancing tango since 2016",
        description:
          "During a trip to Argentina, I attended a tango show and took my first steps. Since then, tango has become an important part of my life. My motto is simple: relax and enjoy the dance!",
      },
    },
  },
];
</script>

<style scoped lang="scss">
.teachers {
  padding-block: 100px;
  color: #ffffff;

  &__title {
    margin-bottom: 64px;
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 350px));
    justify-content: center;
    width: 100%;
    max-width: 1400px;
    margin-inline: auto;
  }

  &__card {
    position: relative;
    width: 100%;
    aspect-ratio: 350 / 734;
    overflow: hidden;
    cursor: pointer;
    isolation: isolate;

    &:focus {
      outline: none;
    }
  }

  &__photo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition:
      filter 0.4s ease,
      transform 0.5s ease;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0.4s ease,
      opacity 0.4s ease;
  }

  &__info {
    position: relative;
    z-index: 2;
    flex: 0 0 auto;
    width: 0;
    height: 100%;
    overflow: hidden;
    color: #171717;
    background-color: #ffffff;
    transition: width 0.4s ease;
  }

  &__info-content {
    position: absolute;
    bottom: 40px;
    left: 18px;
    display: flex;
    align-items: center;
    gap: 18px;
    width: max-content;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    white-space: nowrap;
  }

  &__name {
    margin: 0;
    font-family: "Oswald", sans-serif;
    font-size: 30px;
    font-weight: 500;
    line-height: 100%;
    text-transform: uppercase;
  }

  &__experience {
    margin: 0;
    font-family: Georgia, serif;
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  &__description {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    height: 100%;
    padding: 32px 20px;
    overflow-y: auto;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.12);
    opacity: 0;
    transform: translateX(-20px);
    scrollbar-width: none;
    transition:
      opacity 0.4s ease 0.1s,
      transform 0.4s ease 0.1s;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__description-text {
    margin: 0;
    font-family: Georgia, serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
  }

  &__socials {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 28px;
    margin-top: 24px;
  }

  &__social-link {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: #ffffff;
    transition:
      color 0.2s ease,
      transform 0.2s ease;

    svg {
      display: block;
      width: 36px;
      height: 36px;
      fill: currentColor;
    }

    &:hover,
    &:focus-visible {
      color: #ed1515;
      outline: none;
      transform: translateY(-2px);
    }
  }

  &__mobile-caption {
    display: none;
  }

  &__card:hover,
  &__card:focus-visible,
  &__card--active {
    z-index: 2;

    .teachers__photo {
      filter: blur(7px) brightness(0.6);
      transform: scale(1.04);
    }

    .teachers__overlay {
      visibility: visible;
      opacity: 1;
    }

    .teachers__info {
      width: 80px;
    }

    .teachers__description {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

/* Небольшой desktop */
@media (max-width: 1499px) {
  .teachers {
    &__cards {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    &__info-content {
      bottom: 30px;
      left: 15px;
    }

    &__name {
      font-size: clamp(22px, 2vw, 30px);
    }

    &__experience {
      font-size: clamp(15px, 1.4vw, 20px);
    }

    &__description {
      padding-inline: 16px;
    }

    &__description-text {
      font-size: clamp(13px, 1.1vw, 16px);
    }

    &__card:hover,
    &__card:focus-visible,
    &__card--active {
      .teachers__info {
        width: clamp(64px, 5.5vw, 80px);
      }
    }
  }
}

/* Планшет */
@media (max-width: 1023px) {
  .teachers {
    padding-block: 80px;

    &__title {
      margin-bottom: 48px;
    }

    &__cards {
      grid-template-columns: repeat(2, minmax(0, 350px));
      gap: 16px;
    }

    &__name {
      font-size: 27px;
    }

    &__experience {
      font-size: 18px;
    }

    &__description {
      padding: 28px 18px;
    }

    &__description-text {
      font-size: 15px;
    }

    &__card:hover,
    &__card:focus-visible,
    &__card--active {
      .teachers__info {
        width: 72px;
      }
    }
  }
}

/* Mobile: две карточки в строке */
@media (max-width: 599px) {
  .teachers {
    padding-block: 64px;

    &__title {
      margin-bottom: 40px;
    }

    &__cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      width: 100%;
    }

    &__card {
      width: 100%;
      aspect-ratio: 238 / 400;
      background-color: #171717;
    }

    &__photo {
      width: 100%;
      height: calc(100% - 40px);
      object-fit: cover;
      object-position: center top;
    }

    &__overlay {
      inset: 0 0 40px;
      display: block;
    }

    &__info {
      display: none;
    }

    &__description {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 16px;
      overflow-y: auto;
      color: #ffffff;
      background: rgba(0, 0, 0, 0.2);
      opacity: 0;
      transform: none;
    }

    &__description-text {
      font-size: clamp(10px, 2.6vw, 14px);
      line-height: 140%;
    }

    &__socials {
      justify-content: flex-start;
      gap: 18px;
      margin-top: 16px;
    }

    &__social-link,
    &__social-link svg {
      width: 28px;
      height: 28px;
    }

    &__mobile-caption {
      position: absolute;
      z-index: 4;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      width: 100%;
      height: 40px;
      min-width: 0;
      padding: 7px 10px;
      overflow: visible;
      color: #171717;
      background-color: #ffffff;
    }

    &__mobile-name {
      flex: 0 1 auto;
      min-width: 0;
      overflow: hidden;
      font-family: "Oswald", sans-serif;
      font-size: clamp(9px, 2.5vw, 12px);
      font-weight: 500;
      line-height: 1.2;
      text-overflow: ellipsis;
      text-transform: uppercase;
      white-space: nowrap;
    }

    &__mobile-divider {
      flex: 0 0 auto;
      font-family: Georgia, serif;
      font-size: 11px;
    }

    &__mobile-experience {
      flex: 1 1 auto;
      min-width: 0;
      overflow: hidden;
      font-family: Georgia, serif;
      font-size: clamp(8px, 2.1vw, 11px);
      font-style: italic;
      line-height: 1.2;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__mobile-arrow {
      position: absolute;
      top: -7px;
      left: 50%;
      width: 10px;
      height: 10px;
      border-top: 1px solid #ffffff;
      border-left: 1px solid #ffffff;
      transform: translateX(-50%) rotate(45deg);
      transition: transform 0.3s ease;
    }

    &__card:hover,
    &__card:focus-visible,
    &__card--active {
      .teachers__photo {
        filter: blur(7px) brightness(0.55);
        transform: scale(1.05);
      }

      .teachers__overlay {
        visibility: visible;
        opacity: 1;
      }

      .teachers__description {
        opacity: 1;
        transform: none;
      }

      .teachers__mobile-arrow {
        top: -4px;
        transform: translateX(-50%) rotate(225deg);
      }
    }
  }
}

/* Очень узкие телефоны */
@media (max-width: 374px) {
  .teachers {
    &__cards {
      gap: 8px;
    }

    &__card {
      aspect-ratio: 160 / 285;
    }

    &__mobile-caption {
      height: 36px;
      gap: 3px;
      padding-inline: 7px;
    }

    &__photo {
      height: calc(100% - 36px);
    }

    &__overlay {
      bottom: 36px;
    }

    &__description {
      padding: 10px;
    }

    &__description-text {
      font-size: 10px;
    }

    &__socials {
      gap: 14px;
      margin-top: 10px;
    }

    &__social-link,
    &__social-link svg {
      width: 24px;
      height: 24px;
    }

    &__mobile-name {
      font-size: 9px;
    }

    &__mobile-divider {
      font-size: 8px;
    }

    &__mobile-experience {
      font-size: 8px;
    }
  }
}

/* На touch карточка открывается только по нажатию */
@media (hover: none) {
  .teachers {
    &__card:hover:not(.teachers__card--active) {
      .teachers__photo {
        filter: none;
        transform: none;
      }

      .teachers__overlay {
        visibility: hidden;
        opacity: 0;
      }

      .teachers__description {
        opacity: 0;
        transform: none;
      }

      .teachers__mobile-arrow {
        top: -7px;
        transform: translateX(-50%) rotate(45deg);
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .teachers *,
  .teachers *::before,
  .teachers *::after {
    transition: none;
  }
}
</style>
