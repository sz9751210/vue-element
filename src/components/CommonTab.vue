<template>
  <div class="tags">
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>

<script setup>
import { useStore } from "../store/index";
import { useRouter } from "vue-router";
const store = useStore();
const tags = store.tabsList;
const router = useRouter();
console.log("tag", tags);
const changeMenu = (tag) => {
  router.push({ name: tag.name });
};
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;
  width: 100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
