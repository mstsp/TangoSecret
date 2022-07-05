<template>
  <div class="container">
    <section class="section details ">
      <h2 class="section__title">
        танго під силу кожному
      </h2>

      <div class="details__cards">

        <div class="details__card">
          <div class="details__card-content">
            <span class="details__card-icon icon-high-heeled-shoes" />
            <span class="details__card-title">вік</span>
            <span class="details__card-description">
              Танго танцюють у будь-якому віці. Вам 25, 45 чи 55? Неважливо.
            </span>
          </div>
        </div>

        <div class="details__card">
          <div class="details__card-content">
            <span class="details__card-icon icon-point-of-interest" />
            <span class="details__card-title">інтерес</span>
            <span class="details__card-description">Ми допомагаємо людям зробити їх життя більш цікавішим та насиченим емоціями за допомогою танго.</span>
          </div>
        </div>

        <div class="details__card">
          <div class="details__card-content">
            <span class="details__card-icon icon-stylelint" />
            <span class="details__card-title">стиль</span>
            <span class="details__card-description">Ми хочемо навчити вас не просто танцю, а способу життя.</span>
          </div>
        </div>

        <div class="details__card">
          <div class="details__card-content">
            <span class="details__card-icon icon-airline-passenger-care" />
            <span class="details__card-title">турбота</span>
            <span class="details__card-description">Ми хочемо, щоб люди навчилися бути уважнішими до партнера, та слухали себе.</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Details",
});
</script>

<style lang="scss">
.details__cards {
  display: flex;
  flex-wrap: wrap;
}

.details__card {
  width: 50%;
  display: flex;

  &:nth-child(3),
  &:nth-child(4) {
    justify-content: flex-end;
  }
}

.details__card-content {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  text-align: center;
}

.details__card-icon {
  font-size: 60px;
  margin-bottom: 17px;
}

.details__card-title {
  margin-bottom: 20px;
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: center;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.details__card-description {
  font-family: 'Georgia Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  text-align: center;
  letter-spacing: 1px;
}
</style>
