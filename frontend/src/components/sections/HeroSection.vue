<template>
  <section id="hero" class="hero container">
    <div class="hero__info">
      <h1 class="hero__title">
        {{ contentStore.t.hero.title }}
      </h1>

      <p class="hero__description">
        {{ contentStore.t.hero.description }}
      </p>

      <Button :title="contentStore.t.hero.buttonTitle" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/button/Button.vue";
import { useContentStore } from "@/stores/content";

const contentStore = useContentStore();
</script>

<style scoped lang="scss">
.hero {
  display: flex;
  width: 100%;
  height: 1080px;
  color: #ffffff;
  background-image: url("../../assets/images/about-us.png");
  background-repeat: no-repeat;
  background-position: right 19px top;
  background-size: 798px 1080px;
}

.hero__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(50% - 108px);
  height: 100%;
  padding-top: 95px;
  padding-bottom: 80px;
  user-select: none;
}

.hero__title {
  margin: 0 0 50px;
  font-family: "Oswald Regular", sans-serif;
  font-size: 130px;
  font-style: normal;
  font-weight: 400;
  line-height: 92%;
  letter-spacing: -0.02em;
}

.hero__description {
  max-width: 610px;
  margin: 0 0 60px;
  font-family: "Georgia Regular", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 1px;
}

@media (max-width: 1200px) {
  .hero {
    height: 100svh;
    min-height: 720px;
    background-image: url("../../assets/images/about-us-tablet.png");
    background-position: center;
    background-size: cover;
  }

  .hero__info {
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 140px;
    padding-bottom: 100px;
  }

  .hero__title {
    margin-bottom: 30px;
    font-size: 120px;
  }

  .hero__description {
    margin-bottom: 50px;
  }
}

@media (max-width: 640px) {
  .hero {
    height: 100svh;
    min-height: 620px;
    background-image: url("../../assets/images/about-us-mobile.png");
    background-position: center;
    background-size: cover;
  }

  .hero__info {
    justify-content: flex-end;
    padding-top: 120px;
    padding-bottom: 40px;
  }

  .hero__title {
    margin-bottom: 15px;
    font-size: 46px;
  }

  .hero__description {
    margin-bottom: 110px;
    font-size: 14px;
  }
}
</style>
