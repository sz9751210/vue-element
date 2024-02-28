<template>
  <div class="tags">
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>

<script setup>
import { useStore } from "../store/index";
import { useRouter, useRoute } from "vue-router";
const store = useStore();
const router = useRouter();
const route = useRoute();
const tags = store.tabsList;
console.log("tag", tags);
const changeMenu = (tag) => {
  router.push({ name: tag.name });
};
const handleClose = (tag, index) => {
  let length = tags.length - 1;
  store.closeTab(tag);
  // 如果刪除的不是當前頁面，則不做跳轉
  if (tag.name != route.name) {
    return;
  }
  // 如果刪除的是最後一頁，則跳轉到前一個
  if (index === length) {
    router.push({
      name: tags[index - 1].name,
    });
    // 刪除的不是第一頁與最後一頁，則跳轉到下一個，所以就是index，假設刪掉的是1，則2的頁籤會往前變成1
  } else {
    router.push({
      name: tags[index].name,
    });
  }
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
