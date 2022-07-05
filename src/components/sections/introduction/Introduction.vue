<template>
  <section class="section introduction container">
    <h2 class="section__title">
      Давайте знайомитись!
    </h2>

    <p class="section__description">
      Привіт!
      <br>
      Танго Сікрет – затишне місто з атмосферою добра та світла.
      Саме тут ми навчаємо різних людей втілювати за допомогою танго своє натхнення та емоції, танцювати вільно, і не боятися бути собою.
      Наша ціль – створити всі умови для затишного розвитку та мистецтва!
    </p>

    <img src="../../../assets/images/introduction-video.png" alt="">
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Introduction",
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
