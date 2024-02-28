<template>
  <div>
    <el-table :data="list" style="width: 100%" height="600">
      <el-table-column
        v-for="item in tableLabel"
        :prop="item.prop"
        :label="item.label"
        :key="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default>
          <el-button link type="primary" size="small">編輯</el-button>
          <el-button link type="danger" size="small">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
      class="pager mt-4"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
const { proxy } = getCurrentInstance();
const list = ref([]);
const tableLabel = reactive([
  { prop: "name", label: "姓名" },
  { prop: "age", label: "年龄" },
  { prop: "sexLabel", label: "性别" },
  { prop: "birth", label: "出生日期", width: 200 },
  { prop: "addr", label: "地址", width: 320 },
]);
const config = reactive({
  total: 0,
  page: 1,
});
const getUserData = async (config) => {
  console.log(config)
  let res = await proxy.$api.getUserData(config);
  config.total= res.count
  // console.log(res.list);
  list.value = res.list.map((item) => {
    item.sexLabel = item.sex === 0 ? "女" : "男";
    return item;
  });
  return res;
};
const changePage = (page) => {
  // console.log(page);
  config.page=page
  getUserData(config);
}
onMounted(() => {
  getUserData(config);
});
</script>

<style lang="less" scoped>
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}
</style>
