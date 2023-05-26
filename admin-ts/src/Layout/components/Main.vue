<template>
  <div class="main">
    <ButtonListVue />
    <router-view />
  </div>
</template>
  <script lang="ts" setup>
import ButtonListVue from "./ButtonList.vue";
</script>
  <style lang="scss" scoped>
.main {
  flex: 1;

  background: #f5f5f5;
}
</style>