import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./assets/less/index.less";
import store from "./store/index.js";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(store);
// app.use(ElementPlus);
app.mount("#app");
