import Mock from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user";
Mock.mock("http://localhost:5173/mock/home/getTableData","get", homeApi.getHomeData);
Mock.mock("http://localhost:5173/mock/home/getCountData","get", homeApi.getCountData);
Mock.mock("http://localhost:5173/mock/home/getChartData","get", homeApi.getChartData);
Mock.mock("http://localhost:5173/mock/home/getUserData","get", userApi.getUserList);
