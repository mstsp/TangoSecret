<template>
  <section class="about-us container">
      <div class="about-us__info">
        <h1 class="about-us__title">
          Tango Secret
        </h1>
        <p class="about-us__description">Ми — школа аргентинського танго в м. Дніпро. Ми намагаємося, щоб люди не просто дивились, як танцюють інші, а танцювали самі.</p>
        <Button title="Почати танцювати " />
      </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/button/Button.vue";

export default defineComponent({
  name: "AboutUs",
  components: {
    Button
  }
});
</script>

<style lang="scss">
.about-us {
  display: flex;
  justify-content: space-between;
  color: white;
  height: 100vh;
  background-image: url("../../../assets/images/about-us.png");
  background-repeat: no-repeat;
  background-position: right 20px center;
  background-size: 798px 100%;
}

.about-us__info {
  width: calc(50% - 108px);
  height: 100%;
  margin-right: 21px;
  padding-top: 353px;
  padding-bottom: 345px;
  user-select: none;
}

.about-us__title {
  font-family: 'Oswald Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 130px;
  line-height: 92%;
  margin-bottom: 50px;
  letter-spacing: -0.02em;
}

.about-us__description {
  margin-bottom: 60px;
  font-family: 'Georgia Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 1px;
}

@media (max-width:  1200px) {
  .about-us {
    background-image: url("../../../assets/images/about-us-tablet.png");
    background-position: center;
    background-size: 100%;
  }

  .about-us__info {
    width: 100%;
    padding-top: 390px;
    padding-bottom: 290px;
  }

  .about-us__title {
    font-size: 120px;
    margin-bottom: 30px;
  }

  .about-us__description {
    margin-bottom: 50px;
  }

}

@media (max-width: 640px) {
  .about-us {
    background-image: url("../../../assets/images/about-us-mobile.png");
  }

  .about-us__info {
    padding-top: 219px;
    padding-bottom: 40px;
  }
.about-us__title {
  font-size: 46px;
  margin-bottom: 15px;
}

.about-us__description {
  margin-bottom: 110px;
  font-size: 14px;
}
}
</style>
