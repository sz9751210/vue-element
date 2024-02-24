<template>
  <div class="common-layout">
    <el-container>
      <CommonAside />
      <el-container>
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
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
</script>