<template>
  <swiper
    :key="section"
    :navigation="true"
    :initial-slide="initIndex"
  >
    <swiper-slide
      v-for="(item, index) in questions"
      :key="index"
    >
      <div class="swiper-content">
        <div class="swiper-content__info">
          <span class="swiper-content__section">
            Section {{ section }}
          </span>
          <span class="swiper-content__current-person">
            {{ getCurrentPerson(index) }}
          </span>
        </div>
        <p>{{ item }}</p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, {
  Navigation
} from 'swiper/core';
import { defineComponent } from "vue";
SwiperCore.use([Navigation]);

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    questions: {
      type: Object,
      required: true
    },
    initIndex: {
      type: Number,
      required: false,
      default: 0
    },
    section: {
      type: Number,
      required: false,
      default: 0
    }
  },
  setup() {
    const getCurrentPerson = (index: number) => {
      return index % 2 === 0
        ? "Person 1"
        : "Person 2"
    }

    return {
      getCurrentPerson,
    }
  }
})
</script>
