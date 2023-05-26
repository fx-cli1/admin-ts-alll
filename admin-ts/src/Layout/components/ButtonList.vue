<template>
  <div class="button_list">
    <div
      class="button"
      v-for="item in $store.getters.buttonList"
      :key="item.path"
    >
      <el-button-group>
        <el-button type="primary" :plain="!(item.path === $store.getters.activePath)" @click="routeLink(item.path)"> {{ item.title }} </el-button>
        <el-button type="primary" plain  @click="closeRoute(item.path)" icon="Close"></el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import {useRouter} from 'vue-router'
const $router = useRouter();
const $store = useStore();
const routeLink = (path:string) =>{
    $router.push(path);
}
const closeRoute = (path:string) =>{
    $store.commit("REMOVE_BUTTON_LIST",path);
}
</script>
<style lang="scss" scoped>
.button_list {
  background: #fff;
  height: 50px;
  padding: 5px 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  .button {
    .el-button-group {
      margin-right: 10px;
      .el-button:nth-child(2) {
        padding: 0px 3px;
      }
    }
  }
}
</style>