<template>
  <span>{{title}}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    }
  }
});
</script>
