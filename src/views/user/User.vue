<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">＋新增</el-button>
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
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >編輯</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >刪除</el-button
          >
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
    :title="action == 'add' ? '新增用戶' : '編輯用戶'"
    width="45%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[{ required: true, message: '姓名是必填項' }]"
          >
            <el-input
              v-model="formUser.name"
              placeholder="姓名是必填項"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年齡"
            prop="age"
            :rules="[
              { required: true, message: '年齡是必填項' },
              { type: 'number', message: '年齡必須為數字值' },
            ]"
          >
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
          <el-form-item
            label="性別"
            prop="sex"
            :rules="[{ required: true, message: '性別是必選項' }]"
          >
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
          <el-form-item
            label="出生日期"
            prop="birth"
            :rules="[{ required: true, message: '出生日期是必選項' }]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="請輸入日期"
              clearable
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
          :rules="[{ required: true, message: '地址是必填項' }]"
        >
          <el-input
            v-model="formUser.addr"
            placeholder="請輸入地址"
            clearable
          />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">確定</el-button>
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
      proxy.$refs.userForm.resetFields();
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
  addr: "",
});
const onSubmit = () => {
  proxy.$refs.userForm.validate(async (valid) => {
    if (valid) {
      if (action.value == "add") {
        let res = await proxy.$api.addUser(formUser);
        console.log(res);
        if (res) {
          dialogVisible.value = false;
          proxy.$refs.userForm.resetFields();
          getUserData(config);
        }
        // 修改時
      } else {
        formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
        let res = await proxy.$api.editUser(formUser);
        console.log(res);
        if (res) {
          dialogVisible.value = false;
          proxy.$refs.userForm.resetFields();
          getUserData(config);
        }
      }
    } else {
      ElMessage({
        // showClose:true,
        type: "error",
        message: "請檢查輸入是否正確",
      });
    }
  });
};

const action = ref("add");

const handleCancel = () => {
  dialogVisible.value = false;
  proxy.$refs.userForm.resetFields();
};

const handleEdit = (row) => {
  action.value = "edit";
  dialogVisible.value = true;
  console.log(row);
  row.sex == 1 ? (row.sex = "男") : (row.sex = "女");
  proxy.$nextTick(() => {
    Object.assign(formUser, row);
  });
  // formUser.name = row.name;
  // formUser.age = row.age;
  // formUser.sex = row.sex;
  // formUser.birth = row.birth;
  // formUser.addr = row.addr;
  // dialogVisible.value = true;
};

const handleAdd = () => {
  action.value = "add";
  dialogVisible.value = true;
};

const handleDelete = (row) => {
  ElMessageBox.confirm("確定刪除嗎?")
    .then(async () => {
      await proxy.$api.deleteUser({
        id: row.id,
      });

      ElMessage({
        message: "刪除成功",
        type: "success",
      });
      getUserData(config);
    })
    .catch(() => {});
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
