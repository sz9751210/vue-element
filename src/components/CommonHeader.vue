<template>
  <!-- <h1>CommonHeader</h1> -->
  <el-header>
    <div class="l-content">
      <!-- icon -->
      <el-button size="small" plain @click="handleCollapse">
        <el-icon>
          <Menu />
        </el-icon>
      </el-button>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="user" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>個人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import user from "../assets/user.png";
</script>

<style lang="less" scoped>
header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.r-content {
  .user {
    width: 60px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
