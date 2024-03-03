<template>
  <el-form :model="loginForm" class="login">
    <h3>系統登入</h3>
    <el-form-item>
      <el-input
        type="input"
        placeholder="請輸入用戶名"
        v-model="loginForm.username"
      />
    </el-form-item>
    <el-form-item>
      <el-input
        type="password"
        placeholder="請輸入密碼"
        v-model="loginForm.password"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登入</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, getCurrentInstance } from "vue";
import { useStore } from "../../store";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const store = useStore();
const router = useRouter();
const loginForm = reactive({
  username: "admin",
  password: "admin",
});

const handleLogin = async () => {
  const res = await proxy.$api.getMenu(loginForm);
  console.log(res);
  store.setMenu(res.menu);
  store.addMenu(router);
  router.push({
    name: "home"
  })
};
</script>

<style lang="less" scoped>
.login {
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  margin: 180px auto;
  box-shadow: 0 0 25px #cac6c6;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #505458;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
