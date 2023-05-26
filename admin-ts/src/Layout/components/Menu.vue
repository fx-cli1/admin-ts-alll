<template>
  <el-sub-menu :index="props.path" v-if="props.children?.length">
    <template #title>
      <el-icon v-if="props.icon">
        <component :is="props.icon"></component>
      </el-icon>
      <span>{{ props.title }}</span>
    </template>
    <Menu
      v-for="item in props.children"
      :key="item.id"
      :path="item.path"
      :children="item.children"
      :title="item.title"
    />
  </el-sub-menu>
  <el-menu-item :index="props.path" @click="handleMenu(props)" v-else>
    <el-icon v-if="props.icon">
      <component :is="props.icon"></component>
    </el-icon>
    <span>{{ title }}</span>
  </el-menu-item>
</template>
<script lang="ts" setup>
import { IMenu } from "@/typings";
import Menu from "./Menu.vue";
import { useStore } from "vuex";
const $store = useStore();
interface IProps {
  path: string;
  icon?: string;
  title: string;
  children?: IMenu[];
}
const props = defineProps<IProps>();
const handleMenu = (item: IProps) => {
  $store.commit('PUSH_BUTTON_LIST',{path:item.path,title:item.title})
};
</script>