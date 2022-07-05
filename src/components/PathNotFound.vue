<template>
  <div class="page-not-found">
    <h1>This is an 404 page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PathNotFound",
});
</script>

<style lang="scss" scoped>
.page-not-found {

  background-color: rgba(23, 23, 23, 1);
  height: 100vh;
}
</style>
