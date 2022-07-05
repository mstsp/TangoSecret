<template>
<div class="container">
  <section class="section schedule ">
    <h2 class="section__title">
      Наш розклад
    </h2>

    <div class="schedule__row" v-for="data in schedule" :key="data.title">
      <div class="schedule__column">
        <span class="schedule__title">{{data.title}} <span class="schedule__subtitle">({{data.description}})</span></span>

        <div  v-for="item in data.times" :key="item">
          <span class="schedule__time">{{item.day}}: {{item.time}}</span>
        </div>
      </div>

      <div class="schedule__column">
        <img :src="require(`/src/assets/images/schedule/${data.image}.png`)" alt="">
      </div>
    </div>

  </section>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Schedule",
  setup() {
    const schedule: any = [
      {
        title: 'Початківці',
        description: 'зміна пар',
        image: 'day-1',
        times: [
          {
            day: 'Вівторок',
            time: '19:00 — 21:20'
          },
          {
            day: 'Субота',
            time: '14:00 — 15:20'
          }
        ]
      },
      {
        title: 'Середня група',
        description: 'зміна пар',
        image: 'day-2',
        times: [
          {
            day: 'Вівторок',
            time: '21:30 — 21:50'
          },
          {
            day: 'Субота',
            time: '18:00 — 19:20'
          }
        ]
      },
      {
        title: 'Тематичне заняття',
        description: 'без зміни пар',
        image: 'day-3',
        times: [
          {
            day: 'Середа',
            time: '19:00 — 20:20'
          },
          {
            day: 'Субота',
            time: '19:30 — 20:50'
          }
        ]
      },
      {
        title: 'Escenario',
        description: 'без зміни пар',
        image: 'day-4',
        times: [
          {
            day: 'Середа',
            time: '20:30 — 21:50'
          },
        ]
      },
      {
        title: 'Практика',
        description: '',
        image: 'day-5',
        times: [
          {
            day: 'Субота',
            time: '20:30 — 21:50'
          },
        ]
      },
      {
        title: 'Мілонга',
        description: 'танцювальна вечірка',
        image: 'day-6',
        times: [
          {
            day: 'Субота',
            time: 'По оголошенню'
          },
        ]
      }
    ]

    return { schedule }
  }
});
</script>

<style lang="scss" scoped>
.schedule__row {
  display: flex;
  max-height: 285px;
  justify-content: space-between;

}

.schedule__row:nth-child(odd) .schedule__column:first-child {
  order: 1;
}

.schedule__column {
  width: 50%;
}

img {
  max-height: 285px;
  width: 516px;
  object-fit: cover;
}

@media (max-width: 1200px) {
  .schedule__row {
flex-wrap: wrap;
  }

  .schedule__row:nth-child(odd) .schedule__column:first-child {
    order: 0;
  }

  .schedule__column {
    width: 100%;
  }
}
</style>
