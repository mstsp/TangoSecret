<template>
  <section id="about" class="about-section container">
    <h2 class="about-section__title section__title">
      {{ contentStore.t.about.title }}
    </h2>

    <p class="about-section__description">
      {{ contentStore.t.about.description }}
    </p>

    <img
      class="about-section__image"
      :src="aboutImage"
      :alt="contentStore.t.about.imageAlt"
    />
  </section>
</template>

<script setup lang="ts">
import aboutImage from "@/assets/images/introduction-video.png";
import { useContentStore } from "@/stores/content";

const contentStore = useContentStore();
</script>

<style scoped lang="scss">
.about-section {
  width: 100%;
}

.about-section__description {
  max-width: 1050px;
  margin: 0 0 40px;
  font-family: "Georgia Regular", serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: 1px;
  white-space: pre-line;
  text-align: center;
  margin-inline: auto;
}

.about-section__image {
  display: block;
  width: 100%;
  height: auto;
}

@media (min-width: 640px) {
  .about-section__description {
    margin-bottom: 60px;
    font-size: 20px;
  }
}

@media (min-width: 1200px) {
  .about-section__description {
    margin-bottom: 80px;
  }
}
</style>
