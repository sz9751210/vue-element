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
