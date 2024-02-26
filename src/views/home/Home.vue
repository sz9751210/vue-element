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
      <div class="num">
        <el-card
          :body-style="{ padding: '0px', display: 'flex' }"
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="details">
            <p class="price">${{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";
const tableData = ref([]);
const countData = ref([]);
const { proxy } = getCurrentInstance();
const getTableList = async () => {
  let res = await proxy.$api.getTableData();
  console.log(res.tableData);
  tableData.value = res.tableData;
};

const getCountList = async () => {
  let res = await proxy.$api.getCountData();
  console.log(res.countData);
  countData.value = res.countData;
};
onMounted(() => {
  getTableList();
  getCountList();
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
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      width: 30%;
      // padding-bottom: 30px;
      margin-bottom: 20px;
    }
    .icons{
      width: 40px;
      height: 40px;
      padding: 10px;
      color: #fff;
      // line-height: 80px;
      // text-align: center;
      // size: 30px;
      // font-size: 30px;
    }
    .details{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .price{
        font-size: 25px;
        margin-bottom: 10px;
      }
      .desc{
        font-size: 14px;
        // text-align: center;
        color: #999;
      }
    }

  }
  
}
</style>
