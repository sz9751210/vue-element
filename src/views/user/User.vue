<template>
  <div class="user-header">
    <el-button type="primary" @click="dialogVisible = true">＋新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="請輸入">
        <el-input
          v-model="formInline.keyword"
          placeholder="請輸入用戶名"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜尋</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="600px">
      <el-table-column
        v-for="item in tableLabel"
        :prop="item.prop"
        :label="item.label"
        :key="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default>
          <el-button size="small">編輯</el-button>
          <el-button type="danger" size="small">刪除</el-button>
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
  <el-dialog
    v-model="dialogVisible"
    title="新增用戶"
    width="45%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input
              v-model="formUser.name"
              placeholder="請輸入姓名"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年齡">
            <el-input
              v-model="formUser.age"
              placeholder="請輸入年齡"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="性別">
            <el-select
              v-model="formUser.sex"
              placeholder="請選擇"
              style="width: 170px"
            >
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="請輸入日期"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="地址">
          <el-input
            v-model="formUser.addr"
            placeholder="請輸入地址"
            clearable
          />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end;">
        <el-form-item>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            確定
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
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
  name: "",
});
const getUserData = async (config) => {
  console.log(config);
  let res = await proxy.$api.getUserData(config);
  config.total = res.count;
  // console.log(res.list);
  list.value = res.list.map((item) => {
    item.sexLabel = item.sex === 0 ? "女" : "男";
    return item;
  });
  return res;
};
const changePage = (page) => {
  // console.log(page);
  config.page = page;
  getUserData(config);
};

const formInline = reactive({
  keyword: "",
});
const handleSearch = () => {
  config.name = formInline.keyword;
  getUserData(config);
};

const dialogVisible = ref(false);
const handleClose = (done) => {
  ElMessageBox.confirm("確定關閉嗎?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const formUser = reactive({
  name: "",
  age: "",
  sex: "",
  birth: "",
  date: "",
});
const onSubmit = () => {
  console.log("submit!");
};

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
    bottom: -120px;
  }
}
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// .el-select {
//   --el-select-width: 170px;
// }
</style>
