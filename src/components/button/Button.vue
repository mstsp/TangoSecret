<template>
  <button class="button">
    {{title}}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutUs",
  props: {
    title: {
      type: String,
      required: true,
    }
  }
});
</script>

<style lang="scss">
.button {
  background-color: transparent;
  border: 2px solid #FFFFFF;
  color: white;
  text-transform: uppercase;
  padding: 24px 48px;
  cursor: pointer;
  position: relative;
  width: fit-content;

  font-family: 'Oswald Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.07em;

  &:hover {
    border-color: #ED1515;
    box-shadow: 0px 0px 10px 3px #ED1515;
    color: #ED1515;

    &:before {
      left: 10%;
    }

    &:after {
      right: 10%;
    }
  }

  &:before {
    content: '';
    position: absolute;
    height: 2px;
    width: 20px;
    background-color: #171717;
    transform: skew(325deg);
    top: -2px;
    left: 82%;
    z-index: 100;
    transition: 0.5s;
  }

  &:after {
    content: '';
    position: absolute;
    height: 2px;
    width: 20px;
    background-color: #171717;
    transform: skew(325deg);
    bottom: -2px;
    right: 82%;
    z-index: 100;
    transition: 0.5s;
  }


}
</style>
