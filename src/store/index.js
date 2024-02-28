import { createStore } from "vuex";
import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    isCollapse: true,
    currentMenu: null,
  }),
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    selectMenu(val) {
      val.name == "home" ? (this.currentMenu = null) : (this.currentMenu = val);
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
