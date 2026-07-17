<template>
  <section id="gallery" class="gallery section">
    <div class="container">
      <div class="gallery__header">
        <h2 class="gallery__title section__title">
          {{ content.title }} {{ selectedYear }}
          {{ content.yearSuffix }}
        </h2>

        <label class="gallery__year-field">
          <span class="gallery__year-label">
            {{ content.selectYear }}
          </span>

          <select
            v-model="selectedYear"
            class="gallery__year-select"
            :aria-label="content.selectYear"
          >
            <option
              v-for="year in availableYears"
              :key="year"
              :value="year"
            >
              {{ year }}
            </option>
          </select>
        </label>
      </div>

      <div v-if="selectedGallery.length" class="gallery__slider">
        <Swiper
          :key="selectedYear"
          :modules="[Keyboard, A11y]"
          :slides-per-view="'auto'"
          :centered-slides="true"
          :initial-slide="initialSlide"
          :space-between="16"
          :keyboard="{
            enabled: true,
            onlyInViewport: true,
          }"
          :a11y="{
            enabled: true,
            prevSlideMessage: content.previousSlide,
            nextSlideMessage: content.nextSlide,
          }"
          :breakpoints="swiperBreakpoints"
          @swiper="setSwiper"
          @slide-change="handleSlideChange"
          @reach-beginning="updateNavigationState"
          @reach-end="updateNavigationState"
          @from-edge="updateNavigationState"
        >
          <SwiperSlide
            v-for="galleryItem in selectedGallery"
            :key="galleryItem.id"
            class="gallery__slide"
          >
            <figure class="gallery__figure">
              <img
                class="gallery__image"
                :src="galleryItem.image"
                :alt="getImageAlt(galleryItem.month)"
                loading="lazy"
              />

              <figcaption class="gallery__month">
                {{ monthNames[galleryItem.month - 1] }}
              </figcaption>
            </figure>
          </SwiperSlide>
        </Swiper>

        <div class="gallery__navigation">
          <button
            class="gallery__navigation-button"
            type="button"
            :disabled="isBeginning"
            :aria-label="content.previousSlide"
            @click="slidePrevious"
          >
            <svg viewBox="0 0 48 16" aria-hidden="true">
              <path d="M8 1 1 8l7 7M2 8h46" />
            </svg>
          </button>

          <span class="gallery__counter" aria-live="polite">
            {{ activeSlideIndex + 1 }} / {{ selectedGallery.length }}
          </span>

          <button
            class="gallery__navigation-button"
            type="button"
            :disabled="isEnd"
            :aria-label="content.nextSlide"
            @click="slideNext"
          >
            <svg viewBox="0 0 48 16" aria-hidden="true">
              <path d="m40 1 7 7-7 7M46 8H0" />
            </svg>
          </button>
        </div>
      </div>

      <p v-else class="gallery__empty">
        {{ content.empty }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";

import { A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

type Language = "uk" | "ru" | "en";

interface Props {
  language?: Language;
  initialYear?: string;
}

interface GalleryItem {
  id: string;
  year: string;
  month: number;
  image: string;
}

interface GalleryContent {
  title: string;
  yearSuffix: string;
  selectYear: string;
  previousSlide: string;
  nextSlide: string;
  empty: string;
  imageAlt: string;
  months: string[];
}

const props = withDefaults(defineProps<Props>(), {
  language: "uk",
  initialYear: "",
});

/*
 * Vite автоматически найдёт изображения внутри всех папок годов.
 *
 * Названия файлов:
 * 01.jpg, 02.jpg, 03.jpg ... 12.jpg
 */
const galleryImages = import.meta.glob<string>(
  "/src/assets/images/gallery/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

const translations: Record<Language, GalleryContent> = {
  uk: {
    title: "Календар Tango Secret",
    yearSuffix: "р.",
    selectYear: "Оберіть рік",
    previousSlide: "Попередній місяць",
    nextSlide: "Наступний місяць",
    empty: "Для цього року фотографій поки немає.",
    imageAlt: "Календар Tango Secret",
    months: [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ],
  },

  ru: {
    title: "Календарь Tango Secret",
    yearSuffix: "г.",
    selectYear: "Выберите год",
    previousSlide: "Предыдущий месяц",
    nextSlide: "Следующий месяц",
    empty: "Для этого года фотографий пока нет.",
    imageAlt: "Календарь Tango Secret",
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
  },

  en: {
    title: "Tango Secret calendar",
    yearSuffix: "",
    selectYear: "Select year",
    previousSlide: "Previous month",
    nextSlide: "Next month",
    empty: "There are no photos available for this year yet.",
    imageAlt: "Tango Secret calendar",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
};

const content = computed<GalleryContent>(
  () => translations[props.language],
);

const monthNames = computed<string[]>(() => content.value.months);

/*
 * Из пути:
 * /src/assets/images/gallery/2022/06.jpg
 *
 * получаем:
 * year: "2022"
 * month: 6
 */
const gallery = computed<GalleryItem[]>(() =>
  Object.entries(galleryImages)
    .map(([path, image]) => {
      const match = path.match(
        /\/gallery\/(\d{4})\/(\d{2})(?:[-_].*)?\.(?:png|jpe?g|webp)$/i,
      );

      if (!match) {
        return null;
      }

      const [, year, monthValue] = match;
      const month = Number(monthValue);

      if (month < 1 || month > 12) {
        return null;
      }

      return {
        id: `${year}-${month}-${path}`,
        year,
        month,
        image,
      };
    })
    .filter((item): item is GalleryItem => item !== null)
    .sort((firstItem, secondItem) => {
      const yearDifference =
        Number(secondItem.year) - Number(firstItem.year);

      if (yearDifference !== 0) {
        return yearDifference;
      }

      return firstItem.month - secondItem.month;
    }),
);

const availableYears = computed<string[]>(() =>
  [...new Set(gallery.value.map((item) => item.year))].sort(
    (firstYear, secondYear) =>
      Number(secondYear) - Number(firstYear),
  ),
);

const selectedYear = ref("");

const selectedGallery = computed<GalleryItem[]>(() =>
  gallery.value.filter((item) => item.year === selectedYear.value),
);

/*
 * Открываем текущий месяц, если он существует.
 * Иначе показываем первый доступный.
 */
const currentMonth = new Date().getMonth() + 1;

const initialSlide = computed<number>(() => {
  const currentMonthIndex = selectedGallery.value.findIndex(
    (item) => item.month === currentMonth,
  );

  return currentMonthIndex >= 0 ? currentMonthIndex : 0;
});

const activeSlideIndex = ref(0);
const isBeginning = ref(true);
const isEnd = ref(false);
const swiperInstance = ref<SwiperType | null>(null);

const swiperBreakpoints = {
  0: {
    spaceBetween: 12,
  },
  600: {
    spaceBetween: 24,
  },
  1024: {
    spaceBetween: 40,
  },
};

const setSwiper = (swiper: SwiperType): void => {
  swiperInstance.value = swiper;
  activeSlideIndex.value = swiper.activeIndex;

  updateNavigationState(swiper);
};

const handleSlideChange = (swiper: SwiperType): void => {
  activeSlideIndex.value = swiper.activeIndex;

  updateNavigationState(swiper);
};

const updateNavigationState = (swiper?: SwiperType): void => {
  const currentSwiper = swiper ?? swiperInstance.value;

  if (!currentSwiper) {
    return;
  }

  isBeginning.value = currentSwiper.isBeginning;
  isEnd.value = currentSwiper.isEnd;
};

const slidePrevious = (): void => {
  swiperInstance.value?.slidePrev();
};

const slideNext = (): void => {
  swiperInstance.value?.slideNext();
};

const getImageAlt = (month: number): string =>
  `${content.value.imageAlt}: ${monthNames.value[month - 1]} ${
    selectedYear.value
  }`;

watch(
  availableYears,
  (years) => {
    if (!years.length) {
      selectedYear.value = "";
      return;
    }

    selectedYear.value = years.includes(props.initialYear)
      ? props.initialYear
      : years[0];
  },
  {
    immediate: true,
  },
);

watch(selectedYear, async () => {
  activeSlideIndex.value = initialSlide.value;
  isBeginning.value = initialSlide.value === 0;
  isEnd.value =
    initialSlide.value === selectedGallery.value.length - 1;

  await nextTick();
});
</script>

<style scoped lang="scss">
.gallery {
  overflow: hidden;
  padding-block: 100px;
  color: #ffffff;

  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    margin-bottom: 64px;
  }

  &__title {
    margin: 0;
  }

  &__year-field {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__year-label {
    font-family: Georgia, serif;
    font-size: 14px;
    color: #949393;
  }

  &__year-select {
    min-width: 112px;
    padding: 10px 34px 10px 14px;
    font-family: "Oswald", sans-serif;
    font-size: 18px;
    color: #ffffff;
    background-color: #171717;
    border: 1px solid #636363;
    border-radius: 0;
    outline: none;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      border-color: #ffffff;
    }
  }

  &__slider {
    width: 100%;
  }

  /*
   * Swiper должен быть виден за пределами container,
   * чтобы отображать соседние слайды.
   */
  :deep(.swiper) {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0 0 16px;
    overflow: visible;
  }

  :deep(.swiper-wrapper) {
    align-items: center;
  }

  :deep(.swiper-slide) {
    width: clamp(260px, 32vw, 460px);
    height: auto;
    opacity: 0.55;
    transform: scale(0.62);
    transition:
      opacity 0.45s ease,
      transform 0.45s ease;
  }

  :deep(.swiper-slide-prev),
  :deep(.swiper-slide-next) {
    opacity: 0.78;
  }

  :deep(.swiper-slide-active) {
    z-index: 2;
    opacity: 1;
    transform: scale(1);
  }

  &__figure {
    position: relative;
    width: 100%;
    aspect-ratio: 0.7;
    margin: 0;
    overflow: hidden;
    background-color: #0e0e0e;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /*
   * Название месяца скрываем, если оно уже есть на изображении.
   * Если понадобится подпись — просто удали display: none.
   */
  &__month {
    display: none;
    position: absolute;
    right: 20px;
    bottom: 20px;
    left: 20px;
    font-family: Georgia, serif;
    font-size: 26px;
    color: #ffffff;
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-top: 6px;
  }

  &__navigation-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 32px;
    padding: 0;
    color: #ffffff;
    background: transparent;
    border: 0;
    cursor: pointer;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;

    svg {
      width: 48px;
      height: 16px;
      overflow: visible;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.3;
    }

    &:hover:not(:disabled),
    &:focus-visible:not(:disabled) {
      outline: none;
      transform: translateX(-2px);
    }

    &:last-child:hover:not(:disabled),
    &:last-child:focus-visible:not(:disabled) {
      transform: translateX(2px);
    }

    &:disabled {
      opacity: 0.25;
      cursor: default;
    }
  }

  &__counter {
    min-width: 46px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    text-align: center;
    white-space: nowrap;
  }

  &__empty {
    margin: 0;
    padding-block: 80px;
    font-family: Georgia, serif;
    font-size: 16px;
    color: #949393;
    text-align: center;
  }
}

/* Планшет */
@media (max-width: 833px) {
  .gallery {
    padding-block: 80px;

    &__header {
      margin-bottom: 48px;
    }

    :deep(.swiper-slide) {
      width: clamp(250px, 55vw, 380px);
      opacity: 0.45;
      transform: scale(0.72);
    }

    :deep(.swiper-slide-active) {
      opacity: 1;
      transform: scale(1);
    }

    &__navigation {
      margin-top: 10px;
    }
  }
}

/* Телефон */
@media (max-width: 599px) {
  .gallery {
    padding-block: 64px;

    &__header {
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 40px;
    }

    &__year-field {
      width: 100%;
      justify-content: space-between;
    }

    &__year-select {
      min-width: 110px;
      font-size: 16px;
    }

    :deep(.swiper-slide) {
      width: calc(100vw - 64px);
      max-width: 350px;
      opacity: 0.35;
      transform: scale(0.88);
    }

    :deep(.swiper-slide-active) {
      opacity: 1;
      transform: scale(1);
    }

    &__navigation {
      margin-top: 14px;
    }

    &__navigation-button {
      width: 42px;

      svg {
        width: 42px;
      }
    }

    &__counter {
      font-size: 14px;
    }
  }
}

@media (max-width: 374px) {
  .gallery {
    :deep(.swiper-slide) {
      width: calc(100vw - 40px);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery *,
  .gallery *::before,
  .gallery *::after,
  .gallery :deep(.swiper-slide) {
    transition: none;
  }
}
</style>
