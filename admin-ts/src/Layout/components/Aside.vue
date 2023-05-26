<template>
  <div class="aside" :style="styleVar">
    <div class="set_up" @click="handleClick">
      <el-icon size="28" color="#fff"><Operation /></el-icon>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :router="true"
      :default-active="activePath"
      :collapse="isCollapse"
      text-color="#fff"
    >
      <Menu
        v-for="item in $store.getters.menuData"
        :key="item.id"
        :path="item.path"
        :title="item.title"
        :icon="item.icon"
        :children="item.children"
      />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, Ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Menu from "./Menu.vue";
const $store = useStore();
const isCollapse: Ref<boolean> = ref(false);
const styleVar = reactive({
  "--collapseWidth": "200px",
});
const activePath: Ref<string> = ref("/home");
const $router = useRouter()
watch(
  () => $router.currentRoute.value,
  (newRouter) => {
    activePath.value =  newRouter.path;
    $store.commit("SET_ACTIVE_PATH",newRouter.path);
  },
  { immediate: true }
)
const handleClick = () => {
  isCollapse.value = !isCollapse.value;
  styleVar["--collapseWidth"] = isCollapse.value ? "64px" : "200px";
};
</script>

<style lang="scss" scoped>
.aside {
  width: var(--collapseWidth);
  flex-shrink:0;
  flex-basis:var(--collapseWidth);
  overflow-y: auto;
  height: 100vh;
  background: #545c64;
  transition-duration: 0.5s;
  .set_up {
    width: 100%;
    height: 50px;
    // text-align: center;
    // line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: var(--collapseWidth);
}
.el-menu {
  border-right: none;
}
</style>