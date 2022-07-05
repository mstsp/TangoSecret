<template>
    <Header />
    <AboutUs />
    <Introduction />
    <Details />
    <Teachers />
    <Schedule />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header/Header.vue";
import AboutUs from "@/components/sections/aboutUs/AboutUs.vue";
import Introduction from "@/components/sections/introduction/Introduction.vue";
import Details from "@/components/sections/details/Details.vue";
import Teachers from "@/components/sections/teachers/Teachers.vue";
// import Schedule from "@/components/sections/schedule/Schedule.vue";

export default defineComponent({
  name: "MainPage",
  components: {
    Header,
    AboutUs,
    Introduction,
    Details,
    Teachers,
    // Schedule
  }
});
</script>
