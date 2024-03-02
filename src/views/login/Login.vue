<template>
  <el-form :model="loginForm" class="login">
    <h3>系統登入</h3>
    <el-form-item>
      <el-input type="input" placeholder="請輸入用戶名" />
    </el-form-item>
    <el-form-item>
        <el-input type="password" placeholder="請輸入密碼" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">登入</el-button>
    </el-form-item>
</el-form>
</template>
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
  :deep(.el-form-item__content){
    justify-content: center;
  }
}
</style>