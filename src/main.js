import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./assets/less/index.less";
// import store from "./store/index.js";
import { createPinia } from "pinia";
import { useStore } from "./store/index";
import "./api/mock.js";
import api from "./api/api";
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
const app = createApp(App);
const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 在 Vue 应用的全局属性中注册一个 $api 对象，使得在任何组件内部都可以通过 this.$api 访问到 api 对象。
app.config.globalProperties.$api = api;
app.use(pinia);
app.use(router);
const store = useStore();

function checkRouter(path) {
  let hasCheck = router
    .getRoutes()
    .filter((route) => route.path == path).length;
  console.log("hasCheck", hasCheck);
  return hasCheck ? true : false;
}
// checkRouter()
store.addMenu(router);

router.beforeEach((to, from, next) => {
  store.getToken();
  const token = store.token;
  if (!token && to.path !== "/login") {
    next({ path: "/login" });
  } else if (!checkRouter(to.path)) {
    next({ name: "home" });
  } else {
    next();
  }
});

// app.use(ElementPlus);
app.mount("#app");
