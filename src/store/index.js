import { createStore } from "vuex";
import { defineStore } from "pinia";

export const useCollapseStore = defineStore("store", {
  state: () => ({
    isCollapse: true,
  }),
  actions: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});

export default useCollapseStore;
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
