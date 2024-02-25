import Mock from "mockjs";
import mockData from "./mockData/home";
Mock.mock("/home/getData", mockData.getHomeData);
