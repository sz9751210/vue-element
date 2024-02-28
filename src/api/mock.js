import Mock from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user";
Mock.mock("/mock/home/getTableData","get", homeApi.getHomeData);
Mock.mock("/mock/home/getCountData","get", homeApi.getCountData);
Mock.mock("/mock/home/getChartData","get", homeApi.getChartData);
Mock.mock("/mock/user/getUserData","get", userApi.getUserList);
