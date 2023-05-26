<template>
  <div class="container">
    <Aside />
    <div class="container_right">
      <ContainerHeader />
      <ContainerMain />
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { getWindowWidth } from "@/utils";
import { onMounted, onUnmounted, Ref, ref } from "vue";
import Aside from "./components/Aside.vue";
import ContainerHeader from "./components/Header.vue";
import ContainerMain from "./components/Main.vue";
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  .container_right {
    flex: 1;
    // flex-grow:1;
    // flex-basis: auto;
    // flex-shrink: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>