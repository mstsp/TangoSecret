<template>
<div class="container">
  <section class="section teachers ">
    <h2 class="section__title">
      Наші викладачі
    </h2>

    <div class="teachers__cards">

      <div class="teachers__card" v-for="(teacherData, index) in teachersData" :key="index">
        <img :src="require(`../../../assets/images/teachers/${teacherData.photo}`)" alt="">

        <div class="teachers__card-teacher-info">
          <div><span class="teachers__card-teacher-name">{{teacherData.name}} - </span><span class="teachers__card-teacher-experience">{{teacherData.experience}}</span></div>
        </div>
        <div class="teachers__card-teacher-description">{{teacherData.description}}</div>
      </div>

    </div>
  </section>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Teachers",
  setup() {
    const teachersData: any = [
      {
        name: "Володимир Сапін",
        experience: "У танго світі  з 2007p.",
        description: "Для мене танго – це образ мислення, який відображає сильну сторону життя. Танець дозволяє мислити розмірено, упевнено, плануючи та відчуваючи оточуючий світ",
        photo: 'teacher-1.png'
      },
      {
        name: "Тетяна Косюченко",
        experience: "У танго світі з 2009p.",
        description: "Ми навчаємо не просто танцювати танго, а розуміти його та отримувати насолоду. Якщо ти хоча б раз спробував танго, то одразу зрозумієш, що це – твоє. І назавжди",
        photo: 'teacher-2.png'
      },
      {
        name: "Тетяна Курбацька",
        experience: "У танго світі з 2016p.",
        description: "Мені хотілося привнести до сімейного дозвілля щось нове, цікаве, те спільне, що дозволило б нам стати ще ближчими одне до одного. Але в танго ми знайшли набагато більше. Чи була я в змозі тоді уявити, що танго захопить нас настільки, що ми будемо готові ділитися своїми знаннями з іншими? Чи була я в змозі тоді уявити, що буду створювати прекрасний одяг для танго?",
        photo: 'teacher-3.png'
      },
      {
        name: "Максим Саміленко",
        experience: "У танго світі з 2016p.",
        description: "У відрядженні до Аргентини мені пощастило побувати на танго шоу, спробувати зробити перші кроки, і навіть отримати сертифікат. Після цього танго увійшло в моє життя щільно і дуже надовго. Намагаюсь ділитися своїми знаннями з учнями, використовуючи весь свій досвід. Головний девіз – розслабляємось і отримуємо задоволення від танго!",
        photo: 'teacher-4.png'
      },
    ]

    return {
      teachersData
    }
  }
});
</script>

<style lang="scss" scoped>
.teachers__cards {
  display: flex;
  width: 100%;
}

.teachers__card {
  position: relative;
  width: 25%;
  max-height: 734px;
  cursor: pointer;
}

img {
  width: 100%;
  transition: 0.3s;

}

.teachers__card:hover img{
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
  filter: blur(5px);
}

.teachers__card-teacher-info {
  position: absolute;
  height: 100%;
  width: 0;
  background-color: #FFFFFF;
  top: 0;
  transition: 0.3s;
  overflow: hidden;
  color: #171717;
  display: flex;
  justify-content: center;
  user-select: none;

  div {
    writing-mode: vertical-rl;
    transform: rotate(-180deg);
    height: 100%;
    padding-top: 80px;
  }
}

.teachers__card-teacher-description {
  position: absolute;
  left: 77px;
  top: 0;
  height: 100%;
  width: calc(100% - 77px);
  transition: 0.6s;
  overflow: hidden;
  opacity: 0;
  display: flex;
  align-items: center;
  padding:  0 20px;
  font-family: 'Georgia Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
}

.teachers__card:hover > .teachers__card-teacher-info {
  width: 77px;
}

.teachers__card:hover > .teachers__card-teacher-description {
  //width: calc(100% - 77px);
  opacity: 1;
}

.teachers__card-teacher-name {
  font-family: 'Oswald Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-transform: uppercase;
}

.teachers__card-teacher-experience {
  font-family: 'Georgia Italic';
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: -0.03em;
}

</style>
