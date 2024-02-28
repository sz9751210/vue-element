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
      <el-card style="height: 280px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div ref="userechart" style="height: 240px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="videoechart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, reactive } from "vue";
const tableData = ref([]);
const countData = ref([]);
import * as echarts from "echarts";

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
  getChartData();
});
// 關於echarts 表格的渲染部分
let xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
let pieOptions = reactive(
  // 饼状图的配置
  {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series: [],
  }
);
let orderData = reactive({
  xData: [],
  series: [],
});

let userData = reactive({
  xData: [],
  series: [],
});
let videoData = reactive({
  series: [],
});

const getChartData = async () => {
  let result = await proxy.$api.getChartData();
  console.log("result", result);
  let res = result.orderData;
  let userRes = result.userData;
  let videoRes = result.videoData;
  orderData.xData = res.date;
  const orderKeys = Object.keys(res.data[0]);
  console.log("key", orderKeys);
  const series = [];
  orderKeys.forEach((key) => {
    series.push({
      name: key,
      data: res.data.map((item) => item[key]),
      type: "line",
    });
  });
  // console.log("series", series);
  orderData.series = series;
  xOptions.xAxis.data = orderData.xData;
  xOptions.series = orderData.series;
  // userData进行渲染
  let hEcharts = echarts.init(proxy.$refs["echart"]);
  hEcharts.setOption(xOptions);

  // 柱状图进行渲染的过程
  userData.xData = userRes.map((item) => item.date);
  userData.series = [
    {
      name: "新增用户",
      data: userRes.map((item) => item.new),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userRes.map((item) => item.active),
      type: "bar",
    },
  ];

  xOptions.xAxis.data = userData.xData;
  xOptions.series = userData.series;
  let uEcharts = echarts.init(proxy.$refs["userechart"]);
  uEcharts.setOption(xOptions);
  videoData.series = [
    {
      data: videoRes,
      type: "pie",
    },
  ];
  pieOptions.series = videoData.series;
  let vEcharts = echarts.init(proxy.$refs["videoechart"]);
  vEcharts.setOption(pieOptions);
};

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
    .el-card {
      width: 30%;
      // padding-bottom: 30px;
      margin-bottom: 20px;
    }
    .icons {
      width: 40px;
      height: 40px;
      padding: 10px;
      color: #fff;
      // line-height: 80px;
      // text-align: center;
      // size: 30px;
      // font-size: 30px;
    }
    .details {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .price {
        font-size: 25px;
        margin-bottom: 10px;
      }
      .desc {
        font-size: 14px;
        // text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
    }
  }
}
</style>
