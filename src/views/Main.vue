<template>
  <div class="common-layout">
    <el-container class="l-container">
      <CommonAside />
      <el-container class="r-container">
        <!-- <el-header>Header</el-header> -->
        <CommonHeader />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
</script>

<style lang="less" scoped>
.r-container {
  flex-wrap: wrap;
}
</style>
