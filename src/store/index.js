import { createStore } from "vuex";
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    isCollapse: true,
    currentMenu: null,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首頁",
        icon: "home",
      },
    ],
    menu: [],
  }),
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    selectMenu(val) {
      if (val.name == "home") {
        this.currentMenu = null;
      } else {
        this.currentMenu = val;
        let result = this.tabsList.findIndex((item) => item.name == val.name);
        result == -1 ? this.tabsList.push(val) : "";
      }
    },
    closeTab(val) {
      let result = this.tabsList.findIndex((item) => item.name == val.name);
      result != -1 && this.tabsList.splice(result, 1);
    },
    setMenu(val) {
      this.menu = val;
      localStorage.setItem("menu", JSON.stringify(val));
    },
    addMenu(router) {
      if (!localStorage.getItem("menu")) return;
      const menu = JSON.parse(localStorage.getItem("menu"));
      this.menu = menu;
      console.log("menu", menu);
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            let url = `../views/${item.url}.vue`;
            item.component = () => import(url);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          let url = `../views/${item.url}.vue`;
          item.component = () => import(url);
          menuArray.push(item);
        }
      });
      menuArray.forEach((item) => {
        router.addRoute("home1", item);
      });
      console.log("menuArray", menuArray);
    },
    clearMenu() {
      this.menu = [];
      localStorage.removeItem("menu");
    },
  },
});

// export default createStore({
//   state: {
//     isCollapse: true,
//   },
//   mutations: {
//     changeCollapse(state) {
//       state.isCollapse = !state.isCollapse;
//     },
//   },
//   actions: {
//     changeCollapse(context) {
//       context.commit("changeCollapse");
//     },
//   },
// });
