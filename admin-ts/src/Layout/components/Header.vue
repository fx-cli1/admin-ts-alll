<template>
  <div class="header">
    <div class="title">
      <img class="userImg" :src="userImg" />
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.userName }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item command="launchLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, Ref, ref } from "vue";
import { IUserInfo } from "@/typings/user";
import {requireUrl} from '@/utils'
const $store = useStore();
const $router = useRouter();
const userInfo: Ref<IUserInfo> = ref({
  userName: "",
});
const userImg: Ref<string> = ref(requireUrl('../assets/img/moren.png'));
onMounted(() => {
  userInfo.value = $store.state.user.userInfo;
  userImg.value = $store.state.user.userInfo.userImg ? $store.state.user.userInfo.userImg : requireUrl('../assets/img/moren.png');
});
const handleCommand = (command: string) => {
  switch (command) {
    case "changePassword":
      break;
    case "launchLogin":
      $store.commit("user/REMOVE_TOKEN");
      $store.commit("REMOVE_ROUTEMAP");
      $router.push("/login");
      break;
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: right;
  align-items: center;
  .title {
    margin-right: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .userImg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>