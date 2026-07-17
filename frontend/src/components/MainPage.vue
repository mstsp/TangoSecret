<template>
  <Header />
  <HeroSection />
  <AboutSection />
  <DetailsSection />
  <TeachersSection />
  <ScheduleSection />
  <GallerySection />
  <QuestionsSection />
  <ImageSection />
  <FooterSection />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header/Header.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import GallerySection from "@/components/sections/GallerySection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import DetailsSection from "@/components/sections/DetailsSection.vue";
import TeachersSection from "@/components/sections/TeachersSection.vue";
import FooterSection from "@/components/sections/FooterSection.vue";
import ImageSection from "@/components/sections/ImageSection.vue";
import QuestionsSection from "@/components/sections/QuestionsSection.vue";
import ScheduleSection from "@/components/sections/ScheduleSection.vue";

export default defineComponent({
  name: "MainPage",
  components: {
    Header,
    HeroSection,
    AboutSection,
    DetailsSection,
    TeachersSection,
    FooterSection,
    ImageSection,
    QuestionsSection,
    ScheduleSection,
    GallerySection
  },
});
</script>
