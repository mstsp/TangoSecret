<template>
  <section id="questions" class="questions section">
    <div class="container">
      <h2 class="questions__heading section__title">
        {{ translations[currentLanguage].title }}
      </h2>

      <div class="questions__accordion">
        <article
          v-for="(question, index) in questions"
          :key="question.id"
          class="questions__item"
          :class="{
            'questions__item--open': selectedQuestionId === question.id,
          }"
        >
          <img
            class="questions__background"
            :src="questionsBackground"
            alt=""
            aria-hidden="true"
          />

          <button
            class="questions__button"
            type="button"
            :aria-expanded="selectedQuestionId === question.id"
            :aria-controls="`question-answer-${question.id}`"
            @click="toggleQuestion(question.id)"
          >
            <span class="questions__question">
              {{ question.content[currentLanguage].question }}
            </span>

            <span class="questions__arrow" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          <div
            :id="`question-answer-${question.id}`"
            class="questions__answer-wrapper"
            :aria-hidden="selectedQuestionId !== question.id"
          >
            <div class="questions__answer-inner">
              <p class="questions__answer">
                {{ question.content[currentLanguage].answer }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import questionsBackground from "@/assets/images/questions/questions-background.png";

type Language = "uk" | "ru" | "en";

interface Props {
  language?: Language;
}

interface QuestionContent {
  question: string;
  answer: string;
}

interface Question {
  id: number;
  content: Record<Language, QuestionContent>;
}

const props = withDefaults(defineProps<Props>(), {
  language: "uk",
});

const currentLanguage = computed<Language>(() => props.language);

const selectedQuestionId = ref<number | null>(null);

const translations: Record<Language, { title: string }> = {
  uk: {
    title: "Запитання",
  },
  ru: {
    title: "Вопросы",
  },
  en: {
    title: "Questions",
  },
};

const toggleQuestion = (questionId: number): void => {
  selectedQuestionId.value =
    selectedQuestionId.value === questionId ? null : questionId;
};

const questions: Question[] = [
  {
    id: 1,
    content: {
      uk: {
        question: "Танго? Звучить заманливо. Але я ніколи не танцював...",
        answer:
          "Навіть якщо ваш танцювальний досвід обмежується переглядом танцювальних шоу, це не має значення. Танго відрізняється від інших парних танців, тому навіть досвідченому танцівнику доведеться вчитися заново. Можливо, починати з чистого аркуша буде навіть простіше.",
      },
      ru: {
        question: "Танго? Звучит заманчиво. Но я никогда не танцевал...",
        answer:
          "Даже если ваш танцевальный опыт ограничивается просмотром танцевальных шоу, это не имеет значения. Танго отличается от других парных танцев, поэтому даже опытному танцору придётся учиться заново. Возможно, начинать с чистого листа будет даже проще.",
      },
      en: {
        question: "Tango sounds exciting, but I have never danced before...",
        answer:
          "Even if your dancing experience is limited to watching dance shows, it does not matter. Tango differs from other partner dances, so even an experienced dancer has to learn something new. Starting with a clean slate may actually make the process easier.",
      },
    },
  },
  {
    id: 2,
    content: {
      uk: {
        question: "Гаразд... але в мене немає партнера",
        answer:
          "Це не проблема. Ви можете прийти без партнера. На заняттях зі зміною пар усі учасники регулярно танцюють одне з одним, тому кожен має можливість практикуватися та знайомитися з різними стилями ведення.",
      },
      ru: {
        question: "Ладно... но у меня нет партнёра",
        answer:
          "Это не проблема. Вы можете прийти без партнёра. На занятиях со сменой пар все участники регулярно танцуют друг с другом, поэтому у каждого будет возможность практиковаться и знакомиться с разными стилями ведения.",
      },
      en: {
        question: "All right... but I do not have a partner",
        answer:
          "That is not a problem. You can come without a partner. During classes with partner rotation, everyone dances with different people, so each participant gets enough practice and experience.",
      },
    },
  },
  {
    id: 3,
    content: {
      uk: {
        question: "Із цим розібралися... А який потрібен одяг і взуття?",
        answer:
          "Обирайте вільний одяг, який не сковуватиме ваших рухів. У залі є кондиціонер, тому температура залишається комфортною протягом усього року. Взуття має бути зручним і м’яким. Ідеально, якщо підошва трохи ковзає. Дівчатам бажано обрати взуття хоча б на невеликих підборах.",
      },
      ru: {
        question: "С этим разобрались... А какая нужна одежда и обувь?",
        answer:
          "Выбирайте свободную одежду, которая не будет сковывать ваши движения. В зале есть кондиционер, поэтому температура остаётся комфортной в любое время года. Обувь должна быть удобной и мягкой. Идеально, если подошва немного скользит. Девушкам желательно выбрать обувь хотя бы на небольшом каблуке.",
      },
      en: {
        question: "What kind of clothes and shoes do I need?",
        answer:
          "Choose comfortable clothes that do not restrict your movement. The studio is air-conditioned, so the temperature remains pleasant throughout the year. Your shoes should be soft and comfortable, preferably with soles that can slide. A small heel is recommended for women.",
      },
    },
  },
  {
    id: 4,
    content: {
      uk: {
        question: "Добре. А коли я почну танцювати?",
        answer:
          "Ви почнете танцювати вже на першому занятті. Спочатку ми познайомимося з базовими кроками, правильною поставою та принципами взаємодії в парі. Поступово рухи стануть природними, а танець — упевненим і вільним.",
      },
      ru: {
        question: "Хорошо. А когда я начну танцевать?",
        answer:
          "Вы начнёте танцевать уже на первом занятии. Сначала мы познакомимся с базовыми шагами, правильной осанкой и принципами взаимодействия в паре. Постепенно движения станут естественными, а танец — уверенным и свободным.",
      },
      en: {
        question: "When will I actually start dancing?",
        answer:
          "You will start dancing during your very first class. We begin with basic steps, posture and the principles of communication within a couple. Gradually, your movements will become natural and your dancing more confident.",
      },
    },
  },
  {
    id: 5,
    content: {
      uk: {
        question: "Тоді я хочу якнайшвидше почати. Як записатися?",
        answer:
          "Зв’яжіться з нами телефоном, через соціальні мережі або форму на сайті. Ми підкажемо, яка група вам підходить, відповімо на запитання та домовимося про ваше перше заняття.",
      },
      ru: {
        question: "Тогда я хочу скорее начать. Как записаться?",
        answer:
          "Свяжитесь с нами по телефону, через социальные сети или форму на сайте. Мы подскажем, какая группа вам подходит, ответим на вопросы и договоримся о вашем первом занятии.",
      },
      en: {
        question: "I want to start. How can I sign up?",
        answer:
          "Contact us by phone, through social media or using the form on the website. We will help you choose the right group, answer your questions and arrange your first class.",
      },
    },
  },
  {
    id: 6,
    content: {
      uk: {
        question: "Чи обов’язково купувати абонемент?",
        answer:
          "Ні, ви можете спочатку відвідати разове заняття та познайомитися зі школою, викладачами й атмосферою. Після цього можна обрати абонемент, який найкраще відповідає вашому розкладу.",
      },
      ru: {
        question: "Обязательно покупать абонемент?",
        answer:
          "Нет, сначала вы можете посетить разовое занятие и познакомиться со школой, преподавателями и атмосферой. После этого можно выбрать абонемент, который лучше всего подходит вашему расписанию.",
      },
      en: {
        question: "Do I have to buy a membership?",
        answer:
          "No. You can attend a single class first to meet the teachers and experience the atmosphere of the school. Afterwards, you can choose the membership option that best suits your schedule.",
      },
    },
  },
];
</script>

<style scoped lang="scss">
.questions {
  position: relative;
  overflow: clip;
  padding-block: 100px;
  color: #ffffff;

  &__heading {
    margin-bottom: 64px;
  }

  &__accordion {
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.22);
  }

  &__item {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    isolation: isolate;

    &--open {
      .questions__button {
        grid-column: 1;
      }

      .questions__background {
        visibility: visible;
        opacity: 0.5;
        transform: translateX(-50%) scale(1);
      }

      .questions__answer-wrapper {
        grid-template-rows: 1fr;
        visibility: visible;
        opacity: 1;
      }

      .questions__arrow {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  /*
   * Картинка шире container и занимает всю ширину окна.
   */
  &__background {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 100vw;
    max-width: none;
    height: 100%;
    object-fit: cover;
    object-position: center;
    visibility: hidden;
    opacity: 0;
    filter: brightness(0.42);
    pointer-events: none;
    transform: translateX(-50%) scale(1.05);
    transition:
      visibility 0.45s ease,
      opacity 0.45s ease,
      transform 0.6s ease;
  }

  /*
   * В закрытом состоянии кнопка занимает обе колонки.
   * В открытом состоянии только первую.
   */
  &__button {
    position: static;
    grid-column: 1 / -1;
    grid-row: 1;
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
    min-height: 88px;
    padding: 24px 58px 24px 0;
    color: inherit;
    text-align: left;
    background: transparent;
    border: 0;
    cursor: pointer;

    &:hover {
      .questions__question {
        color: rgba(255, 255, 255, 0.72);
      }

      .questions__arrow {
        opacity: 1;
      }
    }

    &:focus-visible {
      outline: 1px solid rgba(255, 255, 255, 0.7);
      outline-offset: -4px;
    }
  }

  &__question {
    display: block;
    min-width: 0;
    font-family: Georgia, serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
    transition: color 0.25s ease;
  }

  /*
   * Стрелка позиционируется относительно всей строки,
   * поэтому при открытии не уезжает в середину.
   */
  &__arrow {
    position: absolute;
    z-index: 2;
    top: 44px;
    right: 16px;
    width: 22px;
    height: 14px;
    opacity: 0.65;
    pointer-events: auto;
    cursor: pointer;
    transform: translateY(-50%);
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;

    span {
      position: absolute;
      top: 6px;
      width: 12px;
      height: 2px;
      background-color: currentColor;
      border-radius: 2px;

      &:first-child {
        left: 1px;
        transform: rotate(45deg);
      }

      &:last-child {
        right: 1px;
        transform: rotate(-45deg);
      }
    }
  }

  /*
   * Ответ находится во второй колонке.
   * В закрытом состоянии его высота равна нулю.
   */
  &__answer-wrapper {
    grid-column: 2;
    grid-row: 1;
    display: grid;
    grid-template-rows: 0fr;
    min-width: 0;
    visibility: hidden;
    opacity: 0;
    transition:
      grid-template-rows 0.4s ease,
      visibility 0.4s ease,
      opacity 0.3s ease;
  }

  &__answer-inner {
    display: flex;
    align-items: center;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  &__answer {
    margin: 0;
    padding: 28px 64px 28px 32px;
    font-family: Georgia, serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
  }
}

/* Небольшой desktop */
@media (max-width: 1199px) {
  .questions {
    padding-block: 80px;

    &__heading {
      margin-bottom: 48px;
    }

    &__button {
      padding-right: 54px;
    }

    &__answer {
      padding-right: 54px;
    }
  }
}

/*
 * Планшет:
 * вопрос сверху, ответ под ним.
 */
@media (max-width: 833px) {
  .questions {
    &__item {
      grid-template-columns: minmax(0, 1fr);
    }

    &__button,
    &__item--open .questions__button {
      grid-column: 1;
      grid-row: 1;
      min-height: 76px;
      padding: 20px 48px 20px 0;
    }

    &__item--open {
      .questions__button {
        padding-bottom: 12px;
      }

      .questions__arrow {
        transform: translateY(-50%) rotate(180deg);
      }
    }

    &__answer-wrapper {
      grid-column: 1;
      grid-row: 2;
    }

    &__answer {
      padding: 4px 48px 28px 0;
    }

    &__arrow {
      top: 38px;
      right: 12px;
    }
  }
}

/* Телефон */
@media (max-width: 599px) {
  .questions {
    padding-block: 64px;

    &__heading {
      margin-bottom: 40px;
    }

    &__button,
    &__item--open .questions__button {
      min-height: 72px;
      padding: 18px 42px 18px 0;
    }

    &__question {
      font-size: 14px;
    }

    &__answer {
      padding: 4px 34px 24px 0;
      font-size: 14px;
      line-height: 140%;
    }

    &__arrow {
      top: 36px;
      right: 8px;
      width: 18px;
      height: 12px;

      span {
        top: 5px;
        width: 10px;
      }
    }
  }
}

/* Очень узкие телефоны */
@media (max-width: 359px) {
  .questions {
    &__button,
    &__item--open .questions__button {
      padding-right: 36px;
    }

    &__answer {
      padding-right: 24px;
    }

    &__arrow {
      right: 4px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .questions *,
  .questions *::before,
  .questions *::after {
    transition: none;
  }
}
</style>
