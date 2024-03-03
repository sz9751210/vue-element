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
      <el-breadcrumb separator="/" class="bread">
        <!-- 首頁是一定存在的所以直接寫死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="user" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>個人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { computed, onBeforeUnmount } from "vue";
import user from "../assets/images/user.png";
import { useStore } from "../store/index";
import { useRouter } from "vue-router";
const store = useStore();
// import { useStore } from "vuex";
// const store = useStore();
const handleCollapse = () => {
  store.changeCollapse();
};
onBeforeUnmount(() => {
  store.currentMenu = null; // 假设 store 是响应式状态管理库实例
});
const current = computed(() => {
  console.log("current menu", store.currentMenu);
  return store.currentMenu;
});
const router = useRouter();
const handleLogout = () => {
  store.clearMenu();
  router.push({
    name: "login",
    
  });
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: #333;
}
.r-content {
  .user {
    width: 60px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  h3 {
    margin-left: 20px;
    color: #fff;
  }
}

:deep(.bread span) {
  margin-left: 5px;
  color: #fff !important;
  cursor: pointer !important;
}
</style>
