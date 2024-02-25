<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/user.png" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超級管理員</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登錄時間:<span>2022-10-10</span></p>
          <p>上次登錄地點:<span>台中</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <el-card shadow="hover"> </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
const tableData = ref([]);

const getTableList = async () => {
  const res = await axios.get("/home/getData");
  tableData.value = res.data.data.tableData;
};
onMounted(() => {
  getTableList();
});
const tableLabel = {
  name: "品牌",
  todayBuy: "今日銷量",
  monthBuy: "本月銷量",
  totalBuy: "總銷量",
};
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 100px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info {
      margin-left: 20px;
      .name {
        font-size: 32px;
        margin-bottom: 10px;
      }
      .role {
        color: #999;
      }
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
}
</style>
