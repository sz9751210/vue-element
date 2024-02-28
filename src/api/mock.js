import Mock from "mockjs";
import homeApi from "./mockData/home";
Mock.mock("http://localhost:5173/mock/home/getTableData","get", homeApi.getHomeData);
Mock.mock("http://localhost:5173/mock/home/getCountData","get", homeApi.getCountData);
Mock.mock("http://localhost:5173/mock/home/getChartData","get", homeApi.getChartData);
