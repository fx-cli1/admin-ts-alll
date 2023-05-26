<template>
  <div class="login">
    <div class="model">
      <h3>登录</h3>
      <div class="form">
        <el-form
          ref="ruleFormRef"
          :model="postForm"
          status-icon
          label-width="70px"
          label-suffix=":"
          class="demo-ruleForm"
        >
          <el-form-item
            label="用户名"
            prop="userName"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <el-input v-model.number="postForm.userName" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="passWord"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <el-input
              v-model="postForm.passWord"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label-width="10px">
            <el-checkbox v-model="isChecked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item label-width="0px">
            <div class="btn">
              <el-button type="primary" @click="submitForm(ruleFormRef)"
                >登录</el-button
              >
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, Ref, onMounted } from "vue";
import { FormInstance } from "element-plus";
import { getStorage, setStorage } from "@/utils";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ILoginInfo, IUserForm } from "@/typings/user";
import { generatekey, encrypt, decrypt } from "@common/AES";
const ruleFormRef = ref<FormInstance>();
const $Store = useStore();
const $router = useRouter();
const postForm = reactive<IUserForm>({
  passWord: "",
  userName: "",
});
const isChecked: Ref<boolean> = ref(false);
onMounted(() => {
  let loginInfo: ILoginInfo = getStorage("LoginInfo") || "";
  let passWord = "";
  let userName = "";
  let checked = false;
  if (loginInfo) {
    passWord = decrypt(loginInfo.passWord);
    userName = loginInfo.userName;
    checked = loginInfo.isChecked;
  }

  postForm.userName = userName;
  postForm.passWord = passWord;
  isChecked.value = checked;
});
const submitForm = (formEL: FormInstance | undefined) => {
  if (!formEL) return;
  formEL.validate((v) => {
    if (v) {
      if (isChecked.value) {
        let passWord = encrypt(postForm.passWord);
        setStorage("LoginInfo", {
          ...postForm,
          isChecked: isChecked.value,
          passWord,
        });
      }
      $Store.dispatch("user/login", postForm).then((res: string) => {
        $router.push("/");
      });
      //处理登录逻辑
    } else {
      return false;
    }
  });
};
const resetForm = (formEL: FormInstance | undefined) => {
  if (!formEL) return;
  formEL.resetFields(); //重置表单
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: rgb(18, 26, 87);
  display: flex;
  align-items: center;
  justify-content: center;
  .model {
    width: 400px;
    height: 300px;
    background: #fff;
    padding: 20px;
    h3 {
      text-align: center;
      font-size: 28px;
      margin-bottom: 30px;
    }
    .btn {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>